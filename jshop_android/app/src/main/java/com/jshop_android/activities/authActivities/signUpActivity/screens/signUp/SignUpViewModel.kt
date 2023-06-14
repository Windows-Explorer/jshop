package com.jshop_android.activities.authActivities.signUpActivity.screens.signUp

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.activities.authActivities.signInActivity.SignInActivity
import com.jshop_android.activities.mainActivity.MainActivity
import com.jshop_android.common.CustomDispatchers
import com.jshop_android.common.Validator
import com.jshop_android.common.classes.UserSignUp
import com.jshop_android.common.constants.ParamsAPI
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.notIncrementedEvent
import com.jshop_android.store.UserStore
import dagger.hilt.android.lifecycle.HiltViewModel
import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.*
import javax.inject.Inject

@HiltViewModel
class SignUpViewModel @Inject() constructor(context: Context) : ViewModel(),
    IEventHandler<SignUpEvent> {
    private val _signUpViewState: MutableLiveData<SignUpViewState> =
        MutableLiveData(SignUpViewState.Display)

    val signUpViewState: LiveData<SignUpViewState> = _signUpViewState

    private val userStore = UserStore(context)

    @SuppressLint("StaticFieldLeak")
    private val currentActivity = context

    override fun obtainEvent(event: SignUpEvent) {
        when (val currentState = signUpViewState.value) {
            is SignUpViewState.Loading -> reduce(event, currentState)
            is SignUpViewState.Display -> reduce(event, currentState)
            is SignUpViewState.Error -> reduce(event, currentState)
            else -> reduce(
                event, SignUpViewState.Error(
                    usernameIsValid = true,
                    emailIsValid = true,
                    passwordIsValid = true,
                    phoneNumberIsValid = true
                )
            )
        }
    }

    private fun reduce(event: SignUpEvent, currentState: SignUpViewState.Loading) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: SignUpEvent, currentState: SignUpViewState.Error) {
        when (event) {
            is SignUpEvent.SignUp -> signUp(event.userSignUp)
            is SignUpEvent.RedirectToSignIn -> redirectToSignIn()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: SignUpEvent, currentState: SignUpViewState.Display) {
        when (event) {
            is SignUpEvent.SignUp -> signUp(event.userSignUp)
            is SignUpEvent.RedirectToSignIn -> redirectToSignIn()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun signUp(userSignUp: UserSignUp) {
        viewModelScope.launch(Dispatchers.IO) {
            _signUpViewState.postValue(SignUpViewState.Loading)
            if (true) {
                val client = HttpClient() {
                    install(ContentNegotiation) {
                        json()
                    }
                }
                val response: HttpResponse = client.post("${ParamsAPI.API_host}/auth/signup") {
                    contentType(ContentType.Application.Json)
                    setBody(userSignUp)
                }
                if (response.status.value == 200 || response.status.value == 201) {
                    userStore.saveToken(response.bodyAsText())
                    val intent = Intent(currentActivity, MainActivity::class.java)
                    currentActivity.startActivity(intent)
                } else {
                    _signUpViewState.postValue(
                        SignUpViewState.Error(
                            usernameIsValid = true,
                            emailIsValid = true,
                            passwordIsValid = true,
                            phoneNumberIsValid = true
                        )
                    )
                }
            }
        }
    }

    private fun redirectToSignIn() {
        viewModelScope.launch(CustomDispatchers.navigationThreadContext) {
            val intent = Intent(currentActivity, SignInActivity::class.java)
            obtainEvent(SignUpEvent.OutScreen)
            currentActivity.startActivity(intent)
        }
    }

    @OptIn(DelicateCoroutinesApi::class)
    private suspend fun validateForm(userSignUp: UserSignUp): Boolean {
        return viewModelScope.async(CustomDispatchers.validationThreadContext) {
            val usernameIsValid =
                Validator.isUniqueUsername(userSignUp.username) && Validator.minLength(
                    userSignUp.username,
                    4
                ) && Validator.maxLength(userSignUp.username, 32)
            val emailIsValid =
                Validator.isEmail(userSignUp.email) && Validator.isUniqueEmail(userSignUp.email)
            val phoneNumberIsValid = Validator.isPhoneNumber(userSignUp.phoneNumber)
            val passwordIsValid =
                Validator.minLength(userSignUp.password, 8) && Validator.maxLength(
                    userSignUp.password,
                    16
                )
            if (usernameIsValid && emailIsValid && passwordIsValid && phoneNumberIsValid) {
                return@async true
            }
            _signUpViewState.postValue(
                SignUpViewState.Error(
                    usernameIsValid = usernameIsValid,
                    emailIsValid = emailIsValid,
                    passwordIsValid = passwordIsValid,
                    phoneNumberIsValid = phoneNumberIsValid
                )
            )
            return@async false
        }.await()
    }
}