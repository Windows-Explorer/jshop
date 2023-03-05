package com.jshop_android.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.jshop_android.screens.home.HomeScreen
import com.jshop_android.screens.home.HomeViewModel


@Composable
fun NavHost() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = NavRoute.HomeRoute.route){
        composable(NavRoute.HomeRoute.route) {
            HomeScreen(navController = navController, homeViewModel = HomeViewModel() )
        }
    }
}