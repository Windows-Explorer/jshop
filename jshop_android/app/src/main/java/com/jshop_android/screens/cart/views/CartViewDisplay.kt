package com.jshop_android.screens.cart.views

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.jshop_android.components.CartProductCard
import com.jshop_android.components.ProductCard
import com.jshop_android.m3_pullrefresh.PullRefreshIndicator
import com.jshop_android.m3_pullrefresh.pullRefresh
import com.jshop_android.m3_pullrefresh.rememberPullRefreshState
import com.jshop_android.screens.cart.CartEvent
import com.jshop_android.screens.cart.CartViewModel
import com.jshop_android.screens.cart.CartViewState

@Composable
fun CartViewDisplay(cartViewModel: CartViewModel, state: CartViewState.Display) {
    val refreshing = remember { mutableStateOf(false) }
    val refreshState = rememberPullRefreshState(
        refreshing.value,
        {
            cartViewModel.obtainEvent(CartEvent.ReloadScreen)
        }
    )
    val cartProducts = state.cartProducts

    Box(modifier = Modifier.pullRefresh(state = refreshState)) {
        LazyColumn(
            modifier = Modifier.pullRefresh(refreshState)
        ) {
            cartProducts.forEach { cartProduct ->
                item {
                    CartProductCard(cartProduct = cartProduct)
                }
            }
        }
        PullRefreshIndicator(
            refreshing = refreshing.value,
            state = refreshState,
            modifier = Modifier.align(Alignment.TopCenter)
        )
    }
}