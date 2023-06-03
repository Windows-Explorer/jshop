package com.jshop_android.common

import android.util.Log
import com.jshop_android.common.constants.ParamsAPI
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.coroutines.*

@OptIn(DelicateCoroutinesApi::class)
sealed class Validator {
    companion object {
        fun minLength(value: String, minLength: Int): Boolean {
            return runBlocking {
                GlobalScope.async(CustomDispatchers.validationThreadContext) {
                    try {
                        return@async value.length >= minLength
                    } catch (exception: Exception) {
                        Log.e("VALIDATOR", exception.message.toString())
                        return@async false
                    }
                }.await()
            }
        }

        fun maxLength(value: String, maxLength: Int): Boolean {
            return runBlocking {
                GlobalScope.async(CustomDispatchers.validationThreadContext) {
                    try {
                        return@async value.length <= maxLength
                    } catch (exception: Exception) {
                        Log.e("VALIDATOR", exception.message.toString())
                        return@async false
                    }
                }.await()
            }
        }

        fun isEmail(value: String): Boolean {
            return runBlocking {
                GlobalScope.async(CustomDispatchers.validationThreadContext) {
                    try {
                        return@async android.util.Patterns.EMAIL_ADDRESS.matcher(value).matches()
                    } catch (exception: Exception) {
                        Log.e("VALIDATOR", exception.message.toString())
                        return@async false
                    }
                }.await()
            }
        }

        fun isPhoneNumber(value: String): Boolean {
            return runBlocking {
                GlobalScope.async(CustomDispatchers.validationThreadContext) {
                    try {
                        return@async android.util.Patterns.PHONE.matcher(value).matches()
                    } catch (exception: Exception) {
                        Log.e("VALIDATOR", exception.message.toString())
                        return@async false
                    }
                }.await()
            }
        }

        fun isUniqueEmail(value: String): Boolean {
            return runBlocking {
                GlobalScope.async(CustomDispatchers.validationThreadContext) {
                    try {
                        val client = HttpClient()
                        val response = client.get("${ParamsAPI.API_host}/unique/email/${value}")
                        return@async !response.bodyAsText().toBoolean()
                    } catch (exception: Exception) {
                        Log.e("VALIDATOR", exception.message.toString())
                        return@async false
                    }
                }.await()
            }
        }

        fun isUniqueUsername(value: String): Boolean {
            return runBlocking {
                GlobalScope.async(CustomDispatchers.validationThreadContext) {
                    try {
                        val client = HttpClient()
                        val response = client.get("${ParamsAPI.API_host}/unique/username/${value}")
                        return@async !response.bodyAsText().toBoolean()
                    } catch (exception: Exception) {
                        Log.e("VALIDATOR", exception.message.toString())
                        return@async false
                    }
                }.await()
            }
        }
    }
}