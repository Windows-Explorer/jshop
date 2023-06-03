package com.jshop_android.activities.authActivities.signInActivity.viewmodel

import com.jshop_android.common.classes.UserSignIn

sealed class SignInEvent {
    object EnterScreen : SignInEvent()
    data class SignIn(val user: UserSignIn) : SignInEvent()
    object OutScreen : SignInEvent()
    object RedirectToSignUp : SignInEvent()
}