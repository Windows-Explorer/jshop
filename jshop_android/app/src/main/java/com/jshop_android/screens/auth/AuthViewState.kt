package com.jshop_android.screens.auth

sealed class AuthViewState {
    object Loading : AuthViewState()
    object Error : AuthViewState()
    data class Display(
        val items: List<String>,
        val title: String
    ) : AuthViewState()
    object NoItems: AuthViewState()
}
