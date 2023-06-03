package com.jshop_android.activities.authActivities.signUpActivity.viewmodel


sealed class SignUpViewState {
    object Loading: SignUpViewState()
    object Error: SignUpViewState()
    object Display: SignUpViewState()
}