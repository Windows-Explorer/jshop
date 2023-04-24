package com.jshop_android.screens.cart

import com.jshop_android.common.interfaces.ICartProduct

sealed class CartViewState {
    object Loading : CartViewState()
    object Error : CartViewState()
    data class Display(
        val cartProducts: List<ICartProduct>
    ) : CartViewState()
}