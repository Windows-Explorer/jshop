package com.jshop_android.activities.mainActivity.screens.cart

import com.jshop_android.common.classes.CartProduct

sealed class CartEvent {
    object EnterScreen : CartEvent()
    object OutScreen : CartEvent()
    object ReloadScreen : CartEvent()
    object CartUpdated : CartEvent()
    data class CartProductRemoved(val index: Int) : CartEvent()
    data class CartProductCountUpdated(val cartProduct: CartProduct) : CartEvent()
}