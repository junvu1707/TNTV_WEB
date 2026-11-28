package com.vttd.sieutrangnhi

import android.app.Application

class TNTVApplication : Application() {
    lateinit var appContainer: AppContainer

    override fun onCreate() {
        super.onCreate()
        appContainer = AppContainer(this)
    }
}
