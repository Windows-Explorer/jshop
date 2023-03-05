package com.jshop_android.screens.home

import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.navigation.NavController

@Composable
fun HomeScreen(navController: NavController, homeViewModel: HomeViewModel) {
    val viewState = homeViewModel.homeViewState.observeAsState()
}