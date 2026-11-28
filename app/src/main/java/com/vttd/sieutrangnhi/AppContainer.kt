package com.vttd.sieutrangnhi

import android.content.Context

class AppContainer(val context: Context) {
    val vipPrefs: VipPreferenceManager by lazy { VipPreferenceManager(context) }
    val adManager: AdManager by lazy { AdManager(context, vipPrefs) }
    val chibiManager: ChibiManager by lazy { ChibiManager(context) }
    val githubRepo: GitHubQuestionRepository by lazy { GitHubQuestionRepository(context) }
    val examGenerator: DynamicExamGenerator by lazy { DynamicExamGenerator(githubRepo) }

    fun createVipDialogManager(activity: MainActivity): VipDialogManager {
        return VipDialogManager(activity)
    }

    fun createBillingManager(activity: MainActivity): BillingManager {
        return BillingManager(activity, vipPrefs)
    }
}
