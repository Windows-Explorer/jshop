package com.jshop_android.screens.home.views


import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.jshop_android.common.interfaces.IProduct
import com.jshop_android.components.ProductCard
import com.jshop_android.m3_pullrefresh.PullRefreshIndicator
import com.jshop_android.m3_pullrefresh.pullRefresh
import com.jshop_android.m3_pullrefresh.rememberPullRefreshState
import com.jshop_android.screens.home.HomeEvent
import com.jshop_android.screens.home.HomeViewModel
import com.jshop_android.screens.home.generateProducts

@Composable
fun HomeViewDisplay(products: List<IProduct>, homeViewModel: HomeViewModel) {
    var scrollState = rememberScrollState()

    val refreshScope = rememberCoroutineScope()
    val refreshing = remember({ mutableStateOf(false) })
    val refreshState = rememberPullRefreshState(refreshing.value,
        { homeViewModel.obtainEvent(HomeEvent.ReloadScreen) })



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

@Composable
@Preview
fun HomeViewDisplayPreview() {
    Surface(modifier = Modifier.fillMaxSize()) {
        HomeViewDisplay(products = generateProducts(), homeViewModel = HomeViewModel())
    }
}