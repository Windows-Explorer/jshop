package com.jshop_android.screens.account

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.common.interfaces.IEventHandler
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AccountViewModel @Inject constructor() : ViewModel(), IEventHandler<AccountEvent> {
    private val _accountViewState: MutableLiveData<AccountViewState> =
        MutableLiveData(AccountViewState.Loading)

    val accountViewState: LiveData<AccountViewState> = _accountViewState

    override fun obtainEvent(event: AccountEvent) {
        when (val currentState = accountViewState.value) {
            is AccountViewState.Loading -> reduce(event, currentState)

            else -> reduce(event, AccountViewState.Error)
        }
    }

    private fun reduce(event: AccountEvent, currentState: AccountViewState.Loading) {
        when (event) {
            AccountEvent.EnterScreen -> println()
            else -> processError()
        }
    }

    private fun reduce(event: AccountEvent, currentState: AccountViewState.Error) {
        when (event) {
            AccountEvent.ReloadScreen -> println()
            else -> processError()
        }
    }

    private fun processError() {
        viewModelScope.launch {
            _accountViewState.postValue(AccountViewState.Error)
        }
    }
}