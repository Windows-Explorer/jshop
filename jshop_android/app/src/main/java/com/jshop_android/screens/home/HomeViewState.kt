package com.jshop_android.screens.home

import com.jshop_android.interfaces.IProduct

sealed class HomeViewState {
    object Loading: HomeViewState()
    object Error: HomeViewState()
    data class Display(
        val items: List<IProduct>,
        val title: String
    )
}