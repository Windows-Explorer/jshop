package com.jshop_android.activities.authActivities.signUpActivity.screens.signUp

import com.jshop_android.common.classes.UserSignUp

sealed class SignUpEvent {
    object EnterScreen : SignUpEvent()
    object OutScreen : SignUpEvent()
    object RedirectToSignIn : SignUpEvent()
    data class SignUp(val userSignUp: UserSignUp) : SignUpEvent()
}