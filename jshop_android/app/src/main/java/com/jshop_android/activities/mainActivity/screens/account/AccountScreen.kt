package com.jshop_android.activities.mainActivity.screens.account

import androidx.compose.animation.Crossfade
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.platform.LocalContext
import com.jshop_android.common.store.UserStore
import com.jshop_android.components.Loading
import kotlinx.coroutines.runBlocking

@Composable
fun AccountScreen(accountViewModel: AccountViewModel) {
    val viewState = accountViewModel.accountViewState.observeAsState()

    Crossfade(targetState = viewState.value) { state ->
        when (state) {
            is AccountViewState.Loading -> Loading()

            else -> Loading()
        }
        val context = LocalContext.current
        Button(onClick = {
            runBlocking {
                UserStore(context).removeToken()
            }
        },) {
            Text(text = "Выйти")
        }
    }
}