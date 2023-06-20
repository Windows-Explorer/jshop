package com.jshop_android.activities.mainActivity.screens.account

import androidx.compose.animation.Crossfade
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.livedata.observeAsState
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.jshop_android.activities.mainActivity.screens.account.views.AccountViewDisplay
import com.jshop_android.activities.mainActivity.screens.home.views.ErrorView
import com.jshop_android.components.LoadingView

@Composable
fun AccountScreen(accountViewModel: AccountViewModel) {
    val systemUiController = rememberSystemUiController()
    systemUiController.setSystemBarsColor(color = MaterialTheme.colorScheme.secondary)

    val viewState = accountViewModel.accountViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is AccountViewState.Loading -> LoadingView()
            is AccountViewState.Display -> AccountViewDisplay(
                accountViewModel = accountViewModel,
                state = state
            )
            is AccountViewState.Error -> ErrorView()
            else -> ErrorView()
        }
    }

    LaunchedEffect(key1 = viewState, block = {
        accountViewModel.obtainEvent(AccountEvent.EnterScreen)
    })

    DisposableEffect(key1 = viewState) {
        onDispose {
            accountViewModel.obtainEvent(AccountEvent.OutScreen)
        }
    }
}