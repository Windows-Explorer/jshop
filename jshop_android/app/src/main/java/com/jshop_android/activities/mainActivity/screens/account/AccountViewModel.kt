package com.jshop_android.activities.mainActivity.screens.account

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.activities.authActivities.signInActivity.SignInActivity
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.notIncrementedEvent
import com.jshop_android.store.UserStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class AccountViewModel @Inject constructor(context: Context) : ViewModel(),
    IEventHandler<AccountEvent> {
    private val _accountViewState: MutableLiveData<AccountViewState> =
        MutableLiveData(AccountViewState.Display)

    val accountViewState: LiveData<AccountViewState> = _accountViewState
    val userStore = UserStore(context)

    @SuppressLint("StaticFieldLeak")
    val currentActivity = context

    override fun obtainEvent(event: AccountEvent) {
        when (val currentState = accountViewState.value) {
            is AccountViewState.Loading -> reduce(event, currentState)
            is AccountViewState.Display -> reduce(event, currentState)
            is AccountViewState.Error -> reduce(event, currentState)
            else -> reduce(event, AccountViewState.Error)
        }
    }

    private fun reduce(event: AccountEvent, currentState: AccountViewState.Loading) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: AccountEvent, currentState: AccountViewState.Error) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: AccountEvent, currentState: AccountViewState.Display) {
        when (event) {
            is AccountEvent.SignOut -> signOut()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun signOut() {
        viewModelScope.launch(Dispatchers.IO) {
            _accountViewState.postValue(AccountViewState.Loading)
            userStore.removeToken()
            val intent = Intent(currentActivity, SignInActivity::class.java)
            currentActivity.startActivity(intent)
        }
    }
}