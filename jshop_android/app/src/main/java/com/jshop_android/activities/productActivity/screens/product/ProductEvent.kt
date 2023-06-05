package com.jshop_android.activities.productActivity.screens.product

sealed class ProductEvent {
    object EnterScreen : ProductEvent()
    object OutScreen : ProductEvent()
}