package com.vttd.sieutrangnhi

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import androidx.core.content.edit
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.util.concurrent.TimeUnit

/**
 * Quản lý tự động tải, đồng bộ & cache file JSON chứa câu hỏi từ GitHub Repository.
 * Repository: https://github.com/junvu1707/Trangsinhi_de
 * Cấu trúc file đề: grade_<grade>_round_<round> (ví dụ: grade_1_round_1.json tương đương Lớp 1 - Chặng 1)
 *
 * Tối ưu hóa CDN & Manifest-based Sync:
 * - Đọc trực tiếp manifest_free.json và manifest_vip2.json qua CDN raw.githubusercontent.com (Fastly CDN).
 * - KHÔNG gọi REST API (api.github.com), triệt tiêu 100% rủi ro bị khóa ngạch HTTP 403 (60 req/hr).
 * - Chỉ tải lại đúng những tệp có phiên bản mới hơn trong Manifest.
 */
class GitHubQuestionRepository(private val context: Context) {

  companion object {
    private const val TAG = "GitHubQuestionRepo"
    private const val BASE_URL = "https://raw.githubusercontent.com/junvu1707/Trangsinhi_de/refs/heads/V1/"

    const val MANIFEST_FREE_URL = "https://raw.githubusercontent.com/junvu1707/Trangsinhi_de/refs/heads/V1/manifest_free.json"
    const val MANIFEST_VIP2_URL = "https://raw.githubusercontent.com/junvu1707/Trangsinhi_de/refs/heads/V1/manifest_vip2.json"

    private const val PREFS_NAME = "github_question_sync_prefs"
    private const val KEY_LAST_SYNC_TIME = "last_sync_time"

    /**
     * Quy đổi số Chặng (1..18) về đúng chỉ số Round (1..4):
     * - Chặng 1..6   -> round = 1
     * - Chặng 7..10  -> round = 2
     * - Chặng 11..14 -> round = 3
     * - Chặng 15..18 -> round = 4
     */
    fun mapChangToRound(chang: Int): Int {
      return when (chang) {
        in 1..6 -> 1
        in 7..10 -> 2
        in 11..14 -> 3
        in 15..18 -> 4
        else -> 1
      }
    }

    /**
     * Tương thích ngược với getRoundGroup
     */
    fun getRoundGroup(round: Int): Int = mapChangToRound(round)

    /**
     * Lấy đường dẫn Raw URL GitHub trực tiếp (Direct Mapping) theo Lớp (1..5) và Round (1..4)
     * Branch V1: https://raw.githubusercontent.com/junvu1707/Trangsinhi_de/refs/heads/V1/grade_X_round_Y.json
     */
    fun getDirectRawUrl(grade: Int, changOrRound: Int): String {
      val safeGrade = if (grade in 1..5) grade else 1
      val round = mapChangToRound(changOrRound)
      return "https://raw.githubusercontent.com/junvu1707/Trangsinhi_de/refs/heads/V1/grade_${safeGrade}_round_${round}.json"
    }

    /**
     * Tên file JSON tương ứng trong local assets
     */
    fun getLocalAssetFileName(grade: Int, changOrRound: Int): String {
      val safeGrade = if (grade in 1..5) grade else 1
      val round = mapChangToRound(changOrRound)
      return "grade_${safeGrade}_round_${round}.json"
    }
  }

  private val prefs: SharedPreferences by lazy {
    context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
  }

  private val vipPrefs: VipPreferenceManager by lazy {
    VipPreferenceManager(context)
  }

  private val repositoryScope = CoroutineScope(Dispatchers.IO + SupervisorJob())

  private val okHttpClient: OkHttpClient by lazy {
    OkHttpClient.Builder()
      .connectTimeout(15, TimeUnit.SECONDS)
      .readTimeout(15, TimeUnit.SECONDS)
      .build()
  }

  private val cacheDir: File by lazy {
    File(context.filesDir, "github_questions").apply {
      if (!exists()) mkdirs()
    }
  }

  private fun getCacheFile(grade: Int, changOrRound: Int): File {
    val safeGrade = if (grade in 1..5) grade else 1
    val round = mapChangToRound(changOrRound)
    return File(cacheDir, "github_g${safeGrade}_r${round}.json")
  }

  private fun getCacheFileByName(fileName: String): File {
    val cleanName = fileName.replace(".json", "")
    return File(cacheDir, "${cleanName}.json")
  }

  /**
   * Đọc dữ liệu từ local asset dự phòng (Ưu tiên 2)
   */
  fun getLocalAssetQuestionsJson(grade: Int, changOrRound: Int): String? {
    val fileName = getLocalAssetFileName(grade, changOrRound)
    return try {
      context.assets.open(fileName).bufferedReader(Charsets.UTF_8).use { it.readText() }.also {
        Log.d(TAG, "[Local Assets] Đã nạp thành công bộ đề dự phòng từ asset: $fileName")
      }
    } catch (e: Exception) {
      Log.w(TAG, "[Local Assets] Không thể đọc asset '$fileName': ${e.message}")
      null
    }
  }

  /**
   * Lấy câu hỏi từ Cache GitHub đã tải về (Ưu tiên 1)
   */
  fun getCachedQuestionsJson(grade: Int, changOrRound: Int): String? {
    val cacheFile = getCacheFile(grade, changOrRound)
    if (cacheFile.exists() && cacheFile.length() > 0) {
      try {
        val text = cacheFile.readText()
        if (isValidJson(text)) {
          Log.d(TAG, "[Ưu tiên 1 - GitHub Cache] Sử dụng đề đã tải từ GitHub: ${cacheFile.name}")
          return text
        }
      } catch (e: Exception) {
        Log.e(TAG, "[Ưu tiên 1 - GitHub Cache] Lỗi đọc cache ${cacheFile.name}: ${e.message}")
      }
    }
    return null
  }

  /**
   * Tải file JSON mới nhất từ GitHub qua Direct Raw URL (Ưu tiên 1)
   */
  fun fetchAndCacheQuestions(
    grade: Int,
    changOrRound: Int,
    onSuccess: ((String) -> Unit)? = null,
    onError: ((String) -> Unit)? = null
  ) {
    repositoryScope.launch {
      val url = getDirectRawUrl(grade, changOrRound)
      var downloadedJson: String? = null
      var lastError = "Không thể kết nối mạng"

      try {
        Log.d(TAG, "[GitHub CDN] Đang fetch đề thi từ: $url")
        val request = Request.Builder()
          .header("User-Agent", "TNTV-AndroidApp")
          .url(url)
          .build()
        okHttpClient.newCall(request).execute().use { response ->
          if (response.isSuccessful) {
            val bodyString = response.body?.string()
            if (isValidJson(bodyString)) {
              downloadedJson = bodyString
              Log.d(TAG, "[GitHub CDN] Tải và parse JSON thành công từ CDN: $url")
            } else {
              lastError = "Dữ liệu trả về không phải JSON hợp lệ"
              Log.w(TAG, "[GitHub CDN] $lastError từ $url")
            }
          } else {
            lastError = "HTTP ${response.code} tại $url"
            Log.w(TAG, "[GitHub CDN] Không tải được từ CDN: $lastError")
          }
        }
      } catch (e: Exception) {
        lastError = e.message ?: "Lỗi kết nối"
        Log.w(TAG, "[GitHub CDN] Ngoại lệ khi tải từ CDN: $lastError")
      }

      val jsonToSave = downloadedJson
      withContext(Dispatchers.Main) {
        if (jsonToSave != null) {
          try {
            val cacheFile = getCacheFile(grade, changOrRound)
            cacheFile.writeText(jsonToSave)
            Log.d(TAG, "[GitHub CDN] Đã ghi cache thành công tại: ${cacheFile.absolutePath}")
            onSuccess?.invoke(jsonToSave)
          } catch (e: Exception) {
            Log.e(TAG, "[GitHub CDN] Lỗi ghi file cache: ${e.message}")
            onSuccess?.invoke(jsonToSave)
          }
        } else {
          Log.w(TAG, "[GitHub CDN] Fetch thất bại ($lastError). Chuyển sang ƯU TIÊN 2 (Local JSON Assets).")
          onError?.invoke(lastError)
        }
      }
    }
  }

  /**
   * Tự động kiểm tra Manifest phiên bản trên GitHub CDN và đồng bộ ngầm khi mở app.
   */
  fun syncAllGradesInBackground() {
    repositoryScope.launch {
      syncRepoQuestionsInternal(forceRefresh = false)
    }
  }

  /**
   * Ép buộc hoặc chủ động đồng bộ đề thi mới nhất từ GitHub Repository dựa trên Manifest
   */
  fun syncRepoQuestions(forceRefresh: Boolean = true, onComplete: ((Boolean, String) -> Unit)? = null) {
    repositoryScope.launch {
      val (success, message) = syncRepoQuestionsInternal(forceRefresh)
      withContext(Dispatchers.Main) {
        onComplete?.invoke(success, message)
      }
    }
  }

  /**
   * Đọc Manifest tương ứng (Free hoặc VIP2) từ Fastly CDN raw.githubusercontent.com
   */
  private fun fetchManifestMap(isVip2OrAdmin: Boolean): Map<String, Int> {
    val manifestUrl = if (isVip2OrAdmin) MANIFEST_VIP2_URL else MANIFEST_FREE_URL
    val result = mutableMapOf<String, Int>()

    try {
      Log.d(TAG, "[GitHub CDN] Đang nạp Manifest từ CDN: $manifestUrl (IsVIP2/Admin=$isVip2OrAdmin)")
      val request = Request.Builder()
        .url(manifestUrl)
        .header("User-Agent", "TNTV-AndroidApp")
        .build()

      okHttpClient.newCall(request).execute().use { response ->
        if (response.isSuccessful) {
          val body = response.body?.string() ?: ""
          if (body.trim().startsWith("{")) {
            val jsonObj = JSONObject(body)
            val keys = jsonObj.keys()
            while (keys.hasNext()) {
              val key = keys.next()
              val ver = jsonObj.optInt(key, 1)
              result[key] = ver
            }
            Log.d(TAG, "[GitHub CDN] Nạp Manifest thành công: ${result.size} tệp đề thi")
          }
        } else {
          Log.w(TAG, "[GitHub CDN] Nạp Manifest thất bại: HTTP ${response.code}")
        }
      }
    } catch (e: Exception) {
      Log.w(TAG, "[GitHub CDN] Lỗi kết nối nạp Manifest: ${e.message}")
    }

    return result
  }

  private suspend fun syncRepoQuestionsInternal(forceRefresh: Boolean): Pair<Boolean, String> {
    return withContext(Dispatchers.IO) {
      try {
        val userName = vipPrefs.getUserName().lowercase().trim()
        val userEmail = vipPrefs.getUserEmail().lowercase().trim()
        val isVip2OrAdmin = vipPrefs.isVip2() || userName == "uyenlp1310" || userEmail == "uyenlp1310" || userName == "apptest" || userEmail == "apptest"

        val lastSyncTime = prefs.getLong(KEY_LAST_SYNC_TIME, 0L)
        val isExpired = (System.currentTimeMillis() - lastSyncTime) > (6 * 3600 * 1000L) // 6 tiếng

        if (!forceRefresh && !isExpired && hasAnyCacheFile()) {
          Log.d(TAG, "[GitHub CDN] Đã đồng bộ gần đây (<6h). Bỏ qua kiểm tra.")
          return@withContext Pair(true, "Ngân hàng đề thi đã sẵn sàng.")
        }

        val manifestMap = fetchManifestMap(isVip2OrAdmin)

        if (manifestMap.isEmpty()) {
          Log.w(TAG, "[GitHub CDN] Không nạp được Manifest. Giữ nguyên dữ liệu đề thi hiện tại.")
          return@withContext Pair(true, "Ngân hàng đề thi trên máy đã sẵn sàng.")
        }

        var updatedCount = 0

        // Duyệt qua từng file đề thi trong Manifest và so sánh phiên bản
        coroutineScope {
          val deferreds = manifestMap.map { (fileName, onlineVersion) ->
            async {
              val prefKey = "ver_${fileName}"
              val localVersion = prefs.getInt(prefKey, 0)
              val targetCacheFile = getCacheFileByName(fileName)

              val needsUpdate = forceRefresh || onlineVersion > localVersion || !targetCacheFile.exists() || targetCacheFile.length() == 0L

              if (needsUpdate) {
                val fileUrl = "${BASE_URL}${fileName}"
                val jsonStr = downloadRawJson(fileUrl)
                if (isValidJson(jsonStr)) {
                  targetCacheFile.writeText(jsonStr!!)
                  prefs.edit { putInt(prefKey, onlineVersion) }
                  Log.d(TAG, "[GitHub CDN] Cập nhật thành công $fileName (Version $onlineVersion)")
                  true
                } else {
                  false
                }
              } else {
                false
              }
            }
          }
          updatedCount = deferreds.awaitAll().count { it }
        }

        prefs.edit { putLong(KEY_LAST_SYNC_TIME, System.currentTimeMillis()) }

        if (updatedCount > 0) {
          Log.d(TAG, "Đã cập nhật thành công $updatedCount tệp đề thi mới nhất từ CDN!")
          Pair(true, "Đã tự động cập nhật $updatedCount bộ đề mới nhất từ GitHub!")
        } else {
          Log.d(TAG, "Tất cả đề thi trên máy đã ở phiên bản mới nhất!")
          Pair(true, "Ngân hàng đề thi trên GitHub đã ở phiên bản mới nhất!")
        }
      } catch (e: Exception) {
        Log.e(TAG, "Lỗi đồng bộ câu hỏi GitHub CDN: ${e.message}")
        Pair(false, "Không thể kết nối tới GitHub repo: ${e.message}")
      }
    }
  }

  private fun downloadRawJson(url: String): String? {
    return try {
      val request = Request.Builder()
        .url(url)
        .header("User-Agent", "TNTV-AndroidApp")
        .build()
      okHttpClient.newCall(request).execute().use { response ->
        if (response.isSuccessful) {
          val text = response.body?.string()
          if (isValidJson(text)) text else null
        } else null
      }
    } catch (_: Exception) {
      null
    }
  }

  private fun hasAnyCacheFile(): Boolean {
    val files = cacheDir.listFiles()
    return files != null && files.any { it.isFile && it.length() > 0 }
  }

  private fun isValidJson(str: String?): Boolean {
    if (str.isNullOrBlank()) return false
    val trimmed = str.trim()
    return try {
      if (trimmed.startsWith("{")) {
        JSONObject(trimmed)
        true
      } else if (trimmed.startsWith("[")) {
        JSONArray(trimmed)
        true
      } else false
    } catch (_: Exception) {
      false
    }
  }
}
