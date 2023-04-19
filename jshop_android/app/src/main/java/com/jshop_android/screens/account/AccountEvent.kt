package com.jshop_android.screens.account

sealed class AccountEvent {
    object EnterScreen: AccountEvent()
    object OutScreen: AccountEvent()
    object ReloadScreen: AccountEvent()
}