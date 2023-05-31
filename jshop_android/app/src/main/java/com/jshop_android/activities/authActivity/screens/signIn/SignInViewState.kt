package com.jshop_android.activities.authActivity.screens.signIn

sealed class SignInViewState {
    object Loading: SignInViewState()
    object Error: SignInViewState()
    object Display: SignInViewState()
}