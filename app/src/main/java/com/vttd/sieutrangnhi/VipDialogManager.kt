package com.vttd.sieutrangnhi

import android.app.AlertDialog
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.GradientDrawable
import android.text.InputType
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast

class VipDialogManager(private val activity: MainActivity) {

  fun showParentalGateDialog(onPassed: () -> Unit) {
    if (activity.isFinishing || activity.isDestroyed) return
    activity.runOnUiThread {
      if (activity.isFinishing || activity.isDestroyed) return@runOnUiThread

      val num1 = (5..9).random()
      val num2 = (6..9).random()
      val expectedAnswer = num1 * num2

      var dialogRef: AlertDialog? = null

      val container = LinearLayout(activity).apply {
        orientation = LinearLayout.VERTICAL
        setPadding(52, 40, 52, 36)
        val bgDrawable = GradientDrawable().apply {
          setColor(Color.parseColor("#FFFBEB"))
          setStroke(8, Color.parseColor("#F59E0B"))
          cornerRadius = 40f
        }
        background = bgDrawable
      }

      val titleHeader = TextView(activity).apply {
        text = "👨‍👩‍👧‍👦 XÁC NHẬN PHỤ HUYNH"
        setTextColor(Color.parseColor("#991B1B"))
        textSize = 16f
        setTypeface(null, Typeface.BOLD)
        gravity = Gravity.CENTER
        setPadding(0, 0, 0, 8)
      }
      container.addView(titleHeader)

      val subTitle = TextView(activity).apply {
        text = "Để bảo vệ trẻ em và tuân thủ quy định Google Play, vui lòng nhờ phụ huynh giải bài toán bên dưới để tiếp tục:"
        setTextColor(Color.parseColor("#78350F"))
        textSize = 12f
        gravity = Gravity.CENTER
        setLineSpacing(4f, 1f)
        setPadding(0, 0, 0, 16)
      }
      container.addView(subTitle)

      val mathBox = LinearLayout(activity).apply {
        orientation = LinearLayout.HORIZONTAL
        gravity = Gravity.CENTER
        setPadding(24, 16, 24, 16)
        val boxBg = GradientDrawable().apply {
          setColor(Color.WHITE)
          setStroke(4, Color.parseColor("#F59E0B"))
          cornerRadius = 24f
        }
        background = boxBg
        layoutParams = LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          LinearLayout.LayoutParams.WRAP_CONTENT
        ).apply { setMargins(0, 0, 0, 16) }
      }

      val mathQuestionText = TextView(activity).apply {
        text = "$num1 × $num2 = "
        setTextColor(Color.parseColor("#B91C1C"))
        textSize = 22f
        setTypeface(null, Typeface.BOLD)
      }

      val inputAnswer = EditText(activity).apply {
        hint = "?"
        inputType = InputType.TYPE_CLASS_NUMBER
        setSingleLine(true)
        setTextColor(Color.parseColor("#1E293B"))
        textSize = 22f
        setTypeface(null, Typeface.BOLD)
        gravity = Gravity.CENTER
        background = null
        layoutParams = LinearLayout.LayoutParams(140, LinearLayout.LayoutParams.WRAP_CONTENT)
      }

      mathBox.addView(mathQuestionText)
      mathBox.addView(inputAnswer)
      container.addView(mathBox)

      val btnSubmit = Button(activity).apply {
        text = "Xác nhận"
        setTextColor(Color.WHITE)
        textSize = 14f
        setTypeface(null, Typeface.BOLD)
        val btnBg = GradientDrawable().apply {
          setColor(Color.parseColor("#059669"))
          cornerRadius = 24f
        }
        background = btnBg
        setPadding(0, 18, 0, 18)
        layoutParams = LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          LinearLayout.LayoutParams.WRAP_CONTENT
        ).apply { setMargins(0, 8, 0, 8) }

        setOnClickListener {
          val userAns = inputAnswer.text.toString().trim().toIntOrNull()
          if (userAns == expectedAnswer) {
            dialogRef?.dismiss()
            onPassed()
          } else {
            Toast.makeText(activity, "Kết quả chưa đúng, vui lòng thử lại!", Toast.LENGTH_SHORT).show()
          }
        }
      }
      container.addView(btnSubmit)

      val btnCancel = TextView(activity).apply {
        text = "Hủy"
        setTextColor(Color.parseColor("#DC2626"))
        textSize = 13f
        setTypeface(null, Typeface.BOLD)
        gravity = Gravity.CENTER
        setPadding(0, 12, 0, 4)
        isClickable = true
        isFocusable = true
        setOnClickListener {
          dialogRef?.dismiss()
        }
      }
      container.addView(btnCancel)

      dialogRef = AlertDialog.Builder(activity)
        .setView(container)
        .create()

      dialogRef?.window?.apply {
        setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND)
      }
      dialogRef?.show()
    }
  }
}
