package com.jshop_android.activities.authActivity.screens.signIn

import com.jshop_android.common.classes.UserSignIn

sealed class SignInEvent {
    object EnterScreen : SignInEvent()
    data class SignIn(val user: UserSignIn) : SignInEvent()
    object OutScreen : SignInEvent()
    object DialogDismissed: SignInEvent()
}