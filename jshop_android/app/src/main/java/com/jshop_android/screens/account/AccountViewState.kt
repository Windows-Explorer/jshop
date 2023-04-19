package com.jshop_android.screens.account

sealed class AccountViewState {
    object Loading : AccountViewState()
    object Error : AccountViewState()
    object Display : AccountViewState()
}