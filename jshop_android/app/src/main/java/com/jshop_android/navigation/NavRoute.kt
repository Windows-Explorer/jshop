package com.jshop_android.navigation

sealed class NavRoute(val route: String) {
    object HomeRoute: NavRoute("home_route")
    object Account: NavRoute("account_route")
    object Cart : NavRoute("cart_route")
}