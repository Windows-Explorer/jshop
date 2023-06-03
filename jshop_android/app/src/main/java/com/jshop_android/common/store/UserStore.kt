package com.jshop_android.common.store

import android.content.Context
import android.util.Log
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.jshop_android.common.constants.ParamsAPI
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

class UserStore(private val context: Context) {
    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "userStore")
        private val USER_TOKEN_KEY = stringPreferencesKey("user_token")
    }

    val getToken = context.dataStore.data.map { preferences ->
        val token = preferences[USER_TOKEN_KEY] ?: ""
        Log.i("USERSTORE", "getToken returned: ${token}")
        token
    }

    suspend fun saveToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_TOKEN_KEY] = token
            Log.i("USERSTORE", "saveToken saved : ${token}")
        }
    }

    suspend fun verifyToken() {
        val client = HttpClient()
        val token = getToken.first()
        val response = client.get("${ParamsAPI.API_host}/auth/verify") {
            headers {
                append(HttpHeaders.Accept, "application/json")
                append(HttpHeaders.Authorization, "Bearer ${token}")
            }
            contentType(ContentType.Application.Json)
        }
        Log.i("USERSTORE", "verifyToken response status: ${response.status}")
        if (response.status.value == 200 || response.status.value == 201) {
            saveToken(response.bodyAsText())
        } else {
            removeToken()
        }
    }

    suspend fun removeToken() {
        context.dataStore.edit { preferences ->
            preferences[USER_TOKEN_KEY] = ""
            Log.i("USERSTORE", "removedToken")
        }
    }
}