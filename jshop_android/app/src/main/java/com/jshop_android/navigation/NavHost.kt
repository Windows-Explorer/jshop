package com.jshop_android.navigation

import androidx.compose.runtime.Composable
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
    val homeViewModel: HomeViewModel = HomeViewModel()
    val accountViewModel: AccountViewModel = AccountViewModel()
    val cartViewModel: CartViewModel = CartViewModel()

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