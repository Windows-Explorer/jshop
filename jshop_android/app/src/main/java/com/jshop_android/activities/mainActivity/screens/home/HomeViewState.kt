package com.jshop_android.activities.mainActivity.screens.home

import com.jshop_android.common.classes.Product

sealed class HomeViewState {
    object Loading: HomeViewState()
    object Error : HomeViewState()
    data class Display(
        val items: List<Product>,
    ): HomeViewState()
    data class DisplayOneProduct(
        val item: Product
    ): HomeViewState()
}