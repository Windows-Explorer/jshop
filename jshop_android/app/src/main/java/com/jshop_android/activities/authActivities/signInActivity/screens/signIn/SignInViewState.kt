package com.jshop_android.activities.authActivities.signInActivity.screens.signIn

sealed class SignInViewState {
    object Loading: SignInViewState()
    object Error: SignInViewState()
    object Display: SignInViewState()
}