package com.jshop_android.activities.authActivities.signUpActivity.viewmodel

import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.activities.authActivities.signInActivity.viewmodel.SignInEvent
import com.jshop_android.activities.mainActivity.MainActivity
import com.jshop_android.common.classes.UserSignUp
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
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SignUpViewModel @Inject() constructor(context: Context) : ViewModel(),
    IEventHandler<SignUpEvent> {
    private val _signUpViewState: MutableLiveData<SignUpViewState> =
        MutableLiveData(SignUpViewState.Display)

    val signUpViewState: LiveData<SignUpViewState> = _signUpViewState

    private val userStore = UserStore(context)
    private val currentActivity = context

    override fun obtainEvent(event: SignUpEvent) {
        when (val currentState = signUpViewState.value) {
            is SignUpViewState.Loading -> reduce(event, currentState)
            is SignUpViewState.Display -> reduce(event, currentState)
            is SignUpViewState.Error -> reduce(event, currentState)
            else -> reduce(event, SignUpViewState.Error)
        }
    }

    private fun reduce(event: SignUpEvent, currentState: SignUpViewState.Loading) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: SignUpEvent, currentState: SignUpViewState.Error) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: SignUpEvent, currentState: SignUpViewState.Display) {
        when (event) {
            is SignUpEvent.EnterScreen -> println(SignInEvent.EnterScreen)
            is SignUpEvent.SignUp -> signUp(event.userSignUp)
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun signUp(userSignUp: UserSignUp) {
        viewModelScope.launch {
            val client = HttpClient() {
                install(ContentNegotiation) {
                    json()
                }
            }
            _signUpViewState.postValue(SignUpViewState.Loading)
            val response: HttpResponse = client.post("${ParamsAPI.API_host}/auth/signup") {
                contentType(ContentType.Application.Json)
                setBody(userSignUp)
            }
            if (response.status.value == 200 || response.status.value == 201) {
                userStore.saveToken(response.bodyAsText())
                val intent = Intent(currentActivity, MainActivity::class.java)
                currentActivity.startActivity(intent)
            }
            else {
                _signUpViewState.postValue(SignUpViewState.Error)
            }
        }
    }
}