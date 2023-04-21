package com.jshop_android.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AccountCircle
import androidx.compose.material.icons.rounded.Home
import androidx.compose.material.icons.rounded.ShoppingCart
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.lifecycle.ViewModel
import com.jshop_android.screens.home.HomeViewModel

sealed class NavigationItem(
    var route: String,
    var icon: ImageVector,
    var title: String,
    var badge: String = ""
) {
    object Home : NavigationItem(
        route = NavRoute.HomeRoute.route,
        icon = Icons.Rounded.Home,
        title = "Главная"
    )

    object Account : NavigationItem(
        route = NavRoute.Account.route,
        icon = Icons.Rounded.AccountCircle,
        title = "Аккаунт"
    )

    object Cart : NavigationItem(
        route = NavRoute.Cart.route,
        icon = Icons.Rounded.ShoppingCart,
        title = "Корзина",
        badge = "0"
    )
}