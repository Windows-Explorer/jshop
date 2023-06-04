package com.jshop_android.activities.mainActivity.screens.home.views


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.jshop_android.activities.mainActivity.screens.home.HomeEvent
import com.jshop_android.activities.mainActivity.screens.home.HomeViewModel
import com.jshop_android.activities.mainActivity.screens.home.HomeViewState
import com.jshop_android.common.classes.Product
import com.jshop_android.components.ProductCard
import com.jshop_android.m3_pullrefresh.PullRefreshIndicator
import com.jshop_android.m3_pullrefresh.pullRefresh
import com.jshop_android.m3_pullrefresh.rememberPullRefreshState

@Composable
fun HomeViewDisplay(homeViewModel: HomeViewModel, state: HomeViewState.Display) {
    val refreshing = remember { mutableStateOf(false) }
    val refreshState = rememberPullRefreshState(
        refreshing.value,
        {
            homeViewModel.obtainEvent(HomeEvent.ReloadScreen)
        }
    )
    val products: List<Product> = state.items

    Box(modifier = Modifier.pullRefresh(state = refreshState)) {
        LazyColumn(
            modifier = Modifier
                .pullRefresh(refreshState)
                .background(color = MaterialTheme.colorScheme.background)
                .fillMaxSize()
        ) {
            products.forEach { product ->
                item {
                    ProductCard(product = product, homeViewModel = homeViewModel, isLoading = false)
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