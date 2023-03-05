package com.jshop_android.screens.home

sealed class HomeEvent {
    object EnterScreen: HomeEvent()
    object ReloadScreen: HomeEvent()
    data class OnProductClick(val id: Long): HomeEvent()
}