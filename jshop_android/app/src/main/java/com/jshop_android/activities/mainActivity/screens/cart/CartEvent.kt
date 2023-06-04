package com.jshop_android.activities.mainActivity.screens.cart

import com.jshop_android.common.classes.CartProduct
import com.jshop_android.common.classes.Product

sealed class CartEvent {
    object EnterScreen : CartEvent()
    object OutScreen : CartEvent()
    object ReloadScreen : CartEvent()
    object CartUpdated : CartEvent()
    data class CartProductRemoved(val cartProduct: CartProduct) : CartEvent()
}