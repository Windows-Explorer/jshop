package com.jshop_android.activities.mainActivity.screens.cart

import androidx.compose.animation.Crossfade
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.components.Loading
import com.jshop_android.activities.mainActivity.screens.cart.views.CartViewDisplay
import com.jshop_android.activities.mainActivity.screens.home.views.HomeViewError

@Composable
fun CartScreen(cartViewModel: CartViewModel) {
    val viewState = cartViewModel.cartViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is CartViewState.Loading -> Loading()
            is CartViewState.Display -> CartViewDisplay(
                state = state,
                cartViewModel = cartViewModel
            )

            CartViewState.Error -> HomeViewError()
            else -> HomeViewError()
        }
    }

    LaunchedEffect(key1 = viewState, block = {
        cartViewModel.obtainEvent(CartEvent.EnterScreen)
    })
}