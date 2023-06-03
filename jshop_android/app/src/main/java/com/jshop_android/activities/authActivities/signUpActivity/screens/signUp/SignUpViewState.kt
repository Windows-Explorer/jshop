package com.jshop_android.activities.authActivities.signUpActivity.screens.signUp


sealed class SignUpViewState {
    object Loading : SignUpViewState()
    data class Error(
        val usernameIsValid: Boolean,
        val emailIsValid: Boolean,
        val passwordIsValid: Boolean,
        val phoneNumberIsValid: Boolean
    ) : SignUpViewState()

    object Display : SignUpViewState()
}