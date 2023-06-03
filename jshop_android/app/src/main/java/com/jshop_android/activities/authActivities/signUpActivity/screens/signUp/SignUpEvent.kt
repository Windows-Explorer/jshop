package com.jshop_android.activities.authActivities.signUpActivity.viewmodel

import com.jshop_android.common.classes.UserSignUp

sealed class SignUpEvent {
    object EnterScreen : SignUpEvent()
    object OutScreen : SignUpEvent()
    data class SignUp(val userSignUp: UserSignUp) : SignUpEvent()
}