package com.jshop_android.screens.auth

sealed class AuthEvent {
    object EnterScreen : AuthEvent()
    object ReloadScreen: AuthEvent()
    object SignInClicked: AuthEvent()
    object SignUpClicked: AuthEvent()
}