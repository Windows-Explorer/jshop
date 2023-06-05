package com.jshop_android.store

import android.util.Log
import com.jshop_android.common.classes.Category
import com.jshop_android.common.classes.Product
import com.jshop_android.common.constants.ParamsAPI
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*

class CategoriesStore {
    suspend fun getCategories(): List<Category> {
        try {
            val client = HttpClient() {
                install(ContentNegotiation) {
                    json()
                }
            }
            val response = client.get("${ParamsAPI.API_host}/categories") {
                contentType(ContentType.Application.Json)
            }
            if (response.status.value == 200 || response.status.value == 201) {
                return response.body<List<Category>>()
            } else {
                return mutableListOf()
            }
        } catch (exception: Exception) {
            Log.e("CATEGORIESSTORE", exception.message.toString())
            return mutableListOf()
        }
    }
}