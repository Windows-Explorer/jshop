package com.jshop_android.activities.mainActivity.screens.account

sealed class AccountEvent {
    object EnterScreen : AccountEvent()
    object OutScreen : AccountEvent()
    object ReloadScreen : AccountEvent()
    object SignOut : AccountEvent()
}