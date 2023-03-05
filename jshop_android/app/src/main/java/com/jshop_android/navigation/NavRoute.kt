package com.jshop_android.navigation

sealed class NavRoute(val route: String) {
    object HomeRoute: NavRoute("home_route")
}