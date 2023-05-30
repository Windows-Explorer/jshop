package com.jshop_android.activities.mainActivity.screens.cart

import com.jshop_android.common.interfaces.ICartProduct

sealed class CartEvent {
    object EnterScreen : CartEvent()
    object OutScreen : CartEvent()
    object ReloadScreen : CartEvent()
    data class CartProductAdded(val cartProduct: ICartProduct) : CartEvent()
    data class CartProductRemoved(val index: Int) : CartEvent()
    data class CartProductCountUpdated(val cartProduct: ICartProduct) : CartEvent()
}