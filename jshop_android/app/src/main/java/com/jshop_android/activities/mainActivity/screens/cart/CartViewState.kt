package com.jshop_android.activities.mainActivity.screens.cart

import com.jshop_android.common.classes.CartProduct

sealed class CartViewState {
    object Loading : CartViewState()
    object Error : CartViewState()
    data class Display(
        val cartProducts: MutableList<CartProduct>
    ) : CartViewState()
}