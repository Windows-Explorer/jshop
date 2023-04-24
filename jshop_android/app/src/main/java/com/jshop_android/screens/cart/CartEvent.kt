package com.jshop_android.screens.cart

sealed class CartEvent {
    object EnterScreen : CartEvent()
    object OutScreen : CartEvent()
    object ReloadScreen : CartEvent()
    object ProductAdded : CartEvent()
    object ProductRemoved : CartEvent()
}