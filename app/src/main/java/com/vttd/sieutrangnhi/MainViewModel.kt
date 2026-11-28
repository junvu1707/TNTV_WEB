package com.vttd.sieutrangnhi

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class MainViewModel(private val container: AppContainer) : ViewModel() {

    fun refreshVipStatus() {
    }

    fun onPurchaseSuccess(vipLevel: Int) {
        container.vipPrefs.setVipLevel(vipLevel)
    }

    class Factory(private val container: AppContainer) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
                return MainViewModel(container) as T
            }
            throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
