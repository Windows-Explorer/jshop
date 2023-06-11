package com.jshop_android.activities.productActivity.screens

import androidx.compose.animation.Crossfade
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.activities.mainActivity.screens.home.HomeEvent
import com.jshop_android.activities.mainActivity.screens.home.views.ErrorView
import com.jshop_android.activities.productActivity.screens.product.ProductEvent
import com.jshop_android.activities.productActivity.screens.product.ProductViewModel
import com.jshop_android.activities.productActivity.screens.product.ProductViewState
import com.jshop_android.activities.productActivity.screens.product.views.ProductViewDisplay
import com.jshop_android.components.LoadingView

@Composable
fun ProductScreen(productViewModel: ProductViewModel) {
    val viewState = productViewModel.productViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is ProductViewState.Display -> ProductViewDisplay(state = state)
            is ProductViewState.Error -> ErrorView()
            is ProductViewState.Loading -> LoadingView()
            else -> ErrorView()
        }
    }
    LaunchedEffect(key1 = viewState, block = {
        productViewModel.obtainEvent(ProductEvent.EnterScreen)
    })
    DisposableEffect(key1 = viewState) {
        onDispose {
            productViewModel.obtainEvent(ProductEvent.OutScreen)
        }
    }
}