package com.jshop_android.activities.mainActivity.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.jshop_android.activities.mainActivity.screens.account.AccountScreen
import com.jshop_android.activities.mainActivity.screens.account.AccountViewModel
import com.jshop_android.activities.mainActivity.screens.cart.CartScreen
import com.jshop_android.activities.mainActivity.screens.cart.CartViewModel
import com.jshop_android.activities.mainActivity.screens.home.HomeScreen
import com.jshop_android.activities.mainActivity.screens.home.HomeViewModel


@Composable
fun NavHostView(navController: NavHostController) {
    val homeViewModel = HomeViewModel(LocalContext.current)
    val accountViewModel = AccountViewModel(LocalContext.current)
    val cartViewModel = CartViewModel(LocalContext.current)

    NavHost(navController = navController, startDestination = NavRoute.HomeRoute.route) {
        composable(route = NavRoute.HomeRoute.route) {
            HomeScreen(homeViewModel)
        }
        composable(route = NavRoute.Account.route) {
            AccountScreen(accountViewModel)
        }
        composable(route = NavRoute.Cart.route) {
            CartScreen(cartViewModel)
        }
    }
}