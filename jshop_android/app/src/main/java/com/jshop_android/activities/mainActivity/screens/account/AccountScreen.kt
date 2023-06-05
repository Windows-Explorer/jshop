package com.jshop_android.activities.mainActivity.screens.account

import androidx.compose.animation.Crossfade
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.activities.mainActivity.screens.account.views.AccountViewDisplay
import com.jshop_android.activities.mainActivity.screens.home.views.ErrorView
import com.jshop_android.components.LoadingView

@Composable
fun AccountScreen(accountViewModel: AccountViewModel) {
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
}