package com.jshop_android.activities.mainActivity.screens.home

import androidx.compose.animation.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.components.Loading
import com.jshop_android.activities.mainActivity.screens.home.views.HomeViewDisplay
import com.jshop_android.activities.mainActivity.screens.home.views.HomeViewError

@OptIn(ExperimentalAnimationApi::class)
@Composable()
fun HomeScreen(homeViewModel: HomeViewModel) {
    val viewState = homeViewModel.homeViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is HomeViewState.Loading -> Loading()
            is HomeViewState.Display -> HomeViewDisplay(
                state = state,
                homeViewModel = homeViewModel,
            )

            HomeViewState.Error -> HomeViewError()
            else -> HomeViewError()
        }
    }

    LaunchedEffect(key1 = viewState, block = {
        homeViewModel.obtainEvent(HomeEvent.EnterScreen)
    })

    DisposableEffect(key1 = viewState) {
        onDispose {
            homeViewModel.obtainEvent(HomeEvent.OutScreen)
        }
    }
}