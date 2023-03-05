package com.jshop_android.screens.auth

import android.view.KeyCharacterMap.UnavailableException
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.jshop_android.interfaces.IEventHandler
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@HiltViewModel
class AuthViewModel: ViewModel(), IEventHandler<AuthEvent> {
    private val _authViewState: MutableLiveData<AuthViewState> = MutableLiveData(AuthViewState.Loading)

    val authViewState: LiveData<AuthViewState> = _authViewState

    override fun obtainEvent(event: AuthEvent) {
        when (val currentState = _authViewState.value) {
            is AuthViewState.Loading -> reduce(event, currentState)
            else -> throw UnavailableException("Invalid state $currentState")
        }
    }

    private fun reduce(event: AuthEvent, currentState: AuthViewState.Loading) {
        when (event) {
            AuthEvent.EnterScreen -> fetchButton()
            else -> throw UnavailableException("Invalid bruh")
        }
    }

    private fun fetchButton() {
        GlobalScope.launch {
            _authViewState.postValue(
                AuthViewState.Display(
                    items = emptyList(),
                    title = "Title"
                )
            )
        }
    }
}