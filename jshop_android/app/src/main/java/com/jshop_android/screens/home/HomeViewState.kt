package com.jshop_android.screens.home

import com.jshop_android.common.interfaces.IProduct

sealed class HomeViewState {
    object Loading: HomeViewState()
    object Error : HomeViewState()
    data class Display(
        val items: List<IProduct>,
    ): HomeViewState()
    data class DisplayOneProduct(
        val item: IProduct
    ): HomeViewState()
}