package com.jshop_android.activities.mainActivity.screens.home.views


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.zIndex
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
    val currentTab = remember { mutableStateOf(0) }

    Box(modifier = Modifier.pullRefresh(state = refreshState)) {
        if (state.items.isEmpty()) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .background(color = MaterialTheme.colorScheme.secondary)
                    .pullRefresh(refreshState)
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(text = "Пусто", style = MaterialTheme.typography.labelLarge)
            }
        } else {
            TabRow(
                selectedTabIndex = currentTab.value,
                modifier = Modifier
                    .align(alignment = Alignment.TopCenter)
                    .zIndex(30f)
            ) {
                Tab(selected = currentTab.value == 0, onClick = { currentTab.value = 0 }) {
                    Text(
                        text = "Чай",
                        style = MaterialTheme.typography.labelLarge,
                        fontSize = 16.sp,
                        modifier = Modifier.padding(16.dp)
                    )
                }
                Tab(selected = currentTab.value == 1, onClick = { currentTab.value = 1 }) {
                    Text(
                        text = "Кофе",
                        style = MaterialTheme.typography.labelLarge,
                        fontSize = 16.sp,
                        modifier = Modifier.padding(16.dp)
                    )
                }
            }
            LazyColumn(
                modifier = Modifier
                    .pullRefresh(refreshState)
                    .background(color = MaterialTheme.colorScheme.background)
                    .fillMaxSize()
                    .padding(top = 50.dp)
            ) {
                when (currentTab.value) {
                    0 -> products.forEach { product ->
                        if (product.category?.name == "JustTea") {
                            item {
                                ProductCard(product = product, homeViewModel = homeViewModel)
                            }
                        }
                    }
                    1 -> products.forEach { product ->
                        if (product.category?.name == "Coffee") {
                            item {
                                ProductCard(product = product, homeViewModel = homeViewModel)
                            }
                        }
                    }
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
