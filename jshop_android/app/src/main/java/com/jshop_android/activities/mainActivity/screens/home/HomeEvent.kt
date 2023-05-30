package com.jshop_android.activities.mainActivity.screens.home

sealed class HomeEvent {
    object EnterScreen : HomeEvent()
    object OutScreen : HomeEvent()
    object ReloadScreen : HomeEvent()
    object ProductClicked : HomeEvent()
}