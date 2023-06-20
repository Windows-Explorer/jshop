package com.jshop_android.activities.mainActivity.screens.cart

import androidx.compose.animation.Crossfade
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.livedata.observeAsState
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.jshop_android.activities.mainActivity.screens.cart.views.CartViewDisplay
import com.jshop_android.activities.mainActivity.screens.home.views.ErrorView
import com.jshop_android.components.LoadingView

@Composable
fun CartScreen(cartViewModel: CartViewModel) {
    val systemUiController = rememberSystemUiController()
    systemUiController.setSystemBarsColor(color = MaterialTheme.colorScheme.secondary)

    val viewState = cartViewModel.cartViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is CartViewState.Loading -> LoadingView()
            is CartViewState.Display -> CartViewDisplay(
                state = state,
                cartViewModel = cartViewModel
            )

            CartViewState.Error -> ErrorView()
            else -> ErrorView()
        }
    }

    LaunchedEffect(key1 = viewState, block = {
        cartViewModel.obtainEvent(CartEvent.EnterScreen)
    })

    DisposableEffect(key1 = viewState) {
        onDispose {
            cartViewModel.obtainEvent(CartEvent.OutScreen)
        }
    }
}