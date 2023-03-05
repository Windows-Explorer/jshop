package com.jshop_android.screens.auth

import android.view.KeyCharacterMap.UnavailableException
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.screens.auth.views.AuthViewLoading

@ExperimentalFoundationApi
@Composable
fun AuthScreen(
    authViewModel: AuthViewModel
) {
    val viewState = authViewModel.authViewState.observeAsState()

    when (val state = viewState.value) {
        AuthViewState.Loading -> AuthViewLoading()
        else -> throw UnavailableException("wow")
    }
}