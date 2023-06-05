package com.jshop_android.activities.mainActivity.screens.home

import androidx.compose.animation.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.activities.mainActivity.screens.home.views.ErrorView
import com.jshop_android.activities.mainActivity.screens.home.views.HomeViewDisplay
import com.jshop_android.components.LoadingView

@OptIn(ExperimentalAnimationApi::class)
@Composable()
fun HomeScreen(homeViewModel: HomeViewModel) {
    val viewState = homeViewModel.homeViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is HomeViewState.Loading -> LoadingView()
            is HomeViewState.Display -> HomeViewDisplay(
                state = state,
                homeViewModel = homeViewModel,
            )

            HomeViewState.Error -> ErrorView()
            else -> ErrorView()
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