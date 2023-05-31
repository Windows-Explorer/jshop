package com.jshop_android.common.store

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.map

class UserStore(private val context: Context) {
    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "userStore")
        private val USER_TOKEN_KEY = stringPreferencesKey("user_token")
    }

    val getToken = context.dataStore.data.map { preferences ->
        val token = preferences[USER_TOKEN_KEY] ?: ""
        token
    }

    suspend fun saveToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_TOKEN_KEY] = token
        }
    }

    suspend fun removeToken() {
        context.dataStore.edit { preferences ->
            preferences[USER_TOKEN_KEY] = ""
        }
    }
}