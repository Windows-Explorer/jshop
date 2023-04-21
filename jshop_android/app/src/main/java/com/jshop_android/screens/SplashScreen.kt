package com.jshop_android.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.jshop_android.components.BeansLogo

@OptIn(ExperimentalAnimationApi::class)
@Composable
@Preview
fun SplashScreen() {
    var isVisible by remember { mutableStateOf(false) }

    suspend fun showLoadingView() {
        isVisible = true
    }

    Surface(color = MaterialTheme.colorScheme.background, modifier = Modifier.fillMaxSize()) {
        val systemUiController = rememberSystemUiController()

        systemUiController.setStatusBarColor(
            color = MaterialTheme.colorScheme.secondary,
            darkIcons = !isSystemInDarkTheme()
        )
        Column(
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            AnimatedVisibility(
                visible = isVisible, enter = scaleIn(
                    animationSpec = tween(
                        durationMillis = 500, delayMillis = 0
                    )
                ) + fadeIn(), exit = scaleOut()
            ) {
                BeansLogo()
            }
        }

        LaunchedEffect(key1 = isVisible, block = {
            showLoadingView()
        })
    }
}