package com.jshop_android.activities.authActivities.signInActivity.screens.signIn

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.activities.authActivities.signUpActivity.SignUpActivity
import com.jshop_android.activities.mainActivity.MainActivity
import com.jshop_android.common.CustomDispatchers
import com.jshop_android.common.classes.UserSignIn
import com.jshop_android.common.constants.ParamsAPI
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.notIncrementedEvent
import com.jshop_android.common.store.UserStore
import dagger.hilt.android.lifecycle.HiltViewModel
import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SignInViewModel @Inject() constructor(context: Context) : ViewModel(),
    IEventHandler<SignInEvent> {
    private val _signInViewState: MutableLiveData<SignInViewState> =
        MutableLiveData(SignInViewState.Display)

    val signInViewState: LiveData<SignInViewState> = _signInViewState

    private val userStore = UserStore(context)

    @SuppressLint("StaticFieldLeak")
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
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: SignInEvent, currentState: SignInViewState.Error) {
        when (event) {
            is SignInEvent.SignIn -> signIn(event.user)
            is SignInEvent.RedirectToSignUp -> redirectToSignUp()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: SignInEvent, currentState: SignInViewState.Display) {
        when (event) {
            is SignInEvent.SignIn -> signIn(event.user)
            is SignInEvent.RedirectToSignUp -> redirectToSignUp()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun signIn(userSignIn: UserSignIn) {
        viewModelScope.launch(Dispatchers.IO) {
            val client = HttpClient() {
                install(ContentNegotiation) {
                    json()
                }
            }
            _signInViewState.postValue(SignInViewState.Loading)
            val response = client.post("${ParamsAPI.API_host}/auth/signin") {
                contentType(ContentType.Application.Json)
                setBody(userSignIn)
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

    private fun redirectToSignUp() {
        viewModelScope.launch(CustomDispatchers.navigationThreadContext) {
            val intent = Intent(currentActivity, SignUpActivity::class.java)
            obtainEvent(SignInEvent.OutScreen)
            currentActivity.startActivity(intent)
        }
    }
}