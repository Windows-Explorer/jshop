package com.jshop_android.activities.authActivity.screens.signIn

import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.activities.mainActivity.MainActivity
import com.jshop_android.common.classes.UserSignIn
import com.jshop_android.common.constants.ParamsAPI
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.store.UserStore
import dagger.hilt.android.lifecycle.HiltViewModel
import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SignInViewModel @Inject() constructor(context: Context) : ViewModel(),
    IEventHandler<SignInEvent> {
    private val _signInViewState: MutableLiveData<SignInViewState> =
        MutableLiveData(SignInViewState.Display)

    val signInViewState: LiveData<SignInViewState> = _signInViewState
    private val userStore = UserStore(context)
    private val currentActivity = context

    override fun obtainEvent(event: SignInEvent) {
        when (val currentState = signInViewState.value) {
            is SignInViewState.Loading -> reduce(event, currentState)
            is SignInViewState.Display -> reduce(event, currentState)
            is SignInViewState.Error -> reduce(event, currentState)
            else -> reduce(event, SignInViewState.Error)
        }
    }

    private fun reduce(event: SignInEvent, currentState: SignInViewState.Loading) {
        when (event) {
            is SignInEvent.EnterScreen -> println(SignInEvent.EnterScreen)
            is SignInEvent.OutScreen -> println(SignInEvent.OutScreen)
            else -> println("Not incremented event")
        }
    }

    private fun reduce(event: SignInEvent, currentState: SignInViewState.Error) {
        when (event) {
            is SignInEvent.DialogDismissed -> dismissDialog()
            else -> println("${currentState.toString()}: Event ${event.toString()} is not incremented")
        }
    }

    private fun reduce(event: SignInEvent, currentState: SignInViewState.Display) {
        when (event) {
            is SignInEvent.EnterScreen -> println(SignInEvent.EnterScreen)
            is SignInEvent.OutScreen -> println(SignInEvent.OutScreen)
            is SignInEvent.SignIn -> signIn(event.user)
            else -> println("Not incremented event")
        }
    }

    private fun dismissDialog() {
        viewModelScope.launch {
            _signInViewState.postValue(SignInViewState.Display)
        }
    }

    private fun signIn(user: UserSignIn) {
        viewModelScope.launch {
            val client = HttpClient() {
                install(ContentNegotiation) {
                    json()
                }
            }
            _signInViewState.postValue(SignInViewState.Loading)
            val response: HttpResponse = client.post("${ParamsAPI.API_host}/auth/signin") {
                contentType(ContentType.Application.Json)
                setBody(user)
            }
            if (response.status.value == 200 || response.status.value == 201) {
                userStore.saveToken(response.bodyAsText())
                val intent = Intent(currentActivity, MainActivity::class.java)
                currentActivity.startActivity(intent)
                _signInViewState.postValue(SignInViewState.Display)
            } else {
                _signInViewState.postValue(SignInViewState.Error)
            }
        }
    }
}