package com.jshop_android.activities.mainActivity.screens.home

import com.jshop_android.common.classes.Product

sealed class HomeEvent {
    object EnterScreen : HomeEvent()
    object OutScreen : HomeEvent()
    object ReloadScreen : HomeEvent()
    object ProductClicked : HomeEvent()
    data class AddProductToCart(val product: Product) : HomeEvent()
}