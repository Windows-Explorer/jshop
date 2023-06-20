package com.jshop_android.activities.productActivity.screens.product

import com.jshop_android.common.classes.Product

sealed class ProductEvent {
    object EnterScreen : ProductEvent()
    object OutScreen : ProductEvent()
    data class AddProductToCart(val product: Product) : ProductEvent()
}