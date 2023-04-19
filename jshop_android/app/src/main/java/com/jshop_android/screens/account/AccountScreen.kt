package com.jshop_android.screens.account

import androidx.compose.animation.Crossfade
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.components.Loading

@Composable
fun AccountScreen(accountViewModel: AccountViewModel) {
    val viewState = accountViewModel.accountViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is AccountViewState.Loading -> Loading()

            else -> Loading()
        }
    }
}