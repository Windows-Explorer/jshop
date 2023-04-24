package com.jshop_android.screens.home.views


import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.jshop_android.common.interfaces.IProduct
import com.jshop_android.components.ProductCard
import com.jshop_android.m3_pullrefresh.PullRefreshIndicator
import com.jshop_android.m3_pullrefresh.pullRefresh
import com.jshop_android.m3_pullrefresh.rememberPullRefreshState
import com.jshop_android.screens.home.HomeEvent
import com.jshop_android.screens.home.HomeViewModel
import com.jshop_android.screens.home.HomeViewState

@Composable
fun HomeViewDisplay(homeViewModel: HomeViewModel, state: HomeViewState.Display) {
    val refreshing = remember { mutableStateOf(false) }
    val refreshState = rememberPullRefreshState(
        refreshing.value,
        {
            homeViewModel.obtainEvent(HomeEvent.ReloadScreen)
        }
    )
    val products: List<IProduct> = state.items

    Box(modifier = Modifier.pullRefresh(state = refreshState)) {
        LazyColumn(
            modifier = Modifier.pullRefresh(refreshState)
        ) {
            products.forEach { product ->
                item {
                    ProductCard(product = product)
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