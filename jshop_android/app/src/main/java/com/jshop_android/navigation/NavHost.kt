package com.jshop_android.navigation

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.jshop_android.screens.account.AccountScreen
import com.jshop_android.screens.account.AccountViewModel
import com.jshop_android.screens.home.HomeScreen
import com.jshop_android.screens.home.HomeViewModel


@OptIn(ExperimentalFoundationApi::class)
@Composable
fun NavHost(navController: NavHostController) {
    val homeViewModel: HomeViewModel = HomeViewModel(navController)
    val accountViewModel: AccountViewModel = AccountViewModel(navController)

    NavHost(navController = navController, startDestination = NavRoute.HomeRoute.route) {
        composable(route = NavRoute.HomeRoute.route) {
            HomeScreen(homeViewModel)
        }
        composable(route = NavRoute.Account.route) {
            AccountScreen(accountViewModel)
        }
        composable(route = NavRoute.Cart.route)
        {
            HomeScreen(homeViewModel = homeViewModel)
        }
    }
}