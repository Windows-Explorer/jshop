package com.jshop_android.screens.home

sealed class HomeEvent {
    object EnterScreen : HomeEvent()
    object OutScreen : HomeEvent()
    object ReloadScreen : HomeEvent()
    object ProductClicked : HomeEvent()
}