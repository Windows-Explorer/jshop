//package com.jshop_android.navigation
//
//import androidx.compose.animation.AnimatedContentTransitionScope
//import androidx.compose.animation.ExperimentalAnimationApi
//import androidx.compose.animation.core.tween
//import androidx.compose.runtime.Composable
//import androidx.navigation.NavHostController
//import com.google.accompanist.navigation.animation.AnimatedNavHost
//import com.google.accompanist.navigation.animation.composable
//import com.jshop_android.activities.mainActivity.screens.account.AccountScreen
//import com.jshop_android.activities.mainActivity.screens.account.AccountViewModel
//import com.jshop_android.activities.mainActivity.screens.home.HomeScreen
//import com.jshop_android.activities.mainActivity.screens.home.HomeViewModel
//
//@OptIn(ExperimentalAnimationApi::class)
//@Composable
//fun AnimatedNavHostView(navController: NavHostController) {
//    val homeViewModel: HomeViewModel = HomeViewModel()
//    val accountViewModel: AccountViewModel = AccountViewModel()
//
//    AnimatedNavHost(navController = navController, startDestination = NavRoute.HomeRoute.route) {
//        composable(
//            route = NavRoute.HomeRoute.route,
//            enterTransition = {
//                when (initialState.destination.route) {
//                    NavRoute.Cart.route ->
//                        slideIntoContainer(animationSpec = tween(700), towards = AnimatedContentTransitionScope.SlideDirection.Left)
//                    else -> null
//                }
//            },
//        ) {
//            HomeScreen(homeViewModel)
//        }
//        composable(route = NavRoute.Account.route) {
//            AccountScreen(accountViewModel)
//        }
//        composable(route = NavRoute.Cart.route) {
//            HomeScreen(homeViewModel = homeViewModel)
//        }
//    }
//}