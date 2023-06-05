package com.jshop_android.activities.productActivity.screens.product

import com.jshop_android.common.classes.Product

sealed class ProductViewState {
    object Loading : ProductViewState()
    object Error : ProductViewState()
    data class Display(val product: Product) : ProductViewState()
}