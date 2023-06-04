package com.jshop_android.common.store

import android.content.Context
import android.util.Log
import com.jshop_android.common.classes.CartProduct
import com.jshop_android.common.classes.Product
import com.jshop_android.common.constants.ParamsAPI
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.flow.first

class CartStore(private val context: Context) {
    private val userStore = UserStore(context)
    private val client = HttpClient() {
        install(ContentNegotiation) {
            json()
        }
    }

    suspend fun getCart(): List<CartProduct> {
        try {
            val token = userStore.getToken.first()
            val response = client.get("${ParamsAPI.API_host}/cart") {
                contentType(ContentType.Application.Json)
                headers {
                    append(HttpHeaders.Accept, "application/json")
                    append(HttpHeaders.Authorization, "Bearer ${token}")
                }
            }
            Log.i("CARTSTORE", "getCart: ${response.bodyAsText()}")
            if (response.status.value == 200 || response.status.value == 201) {
                return response.body<List<CartProduct>>()
            } else {
                return mutableListOf()
            }
        } catch (exception: Exception) {
            Log.e("CARTSTORE", exception.message.toString())
            return mutableListOf()
        }
    }

    suspend fun addProductToCart(product: Product) {
        try {
            val token = userStore.getToken.first()
            val response = client.post("${ParamsAPI.API_host}/cart/addproducttocart") {
                contentType(ContentType.Application.Json)
                headers {
                    append(HttpHeaders.Accept, "application/json")
                    append(HttpHeaders.Authorization, "Bearer ${token}")
                }
                setBody(product)
            }
            Log.i("CARTSTORE", "addProductToCart: ${response.bodyAsText()}")

        } catch (exception: Exception) {
            Log.e("CARTSTORE", exception.message.toString())
        }
    }

    suspend fun removeProductFromCart(product: Product) {
        try {
            val token = userStore.getToken.first()
            val response = client.post("${ParamsAPI.API_host}/cart/removeproductfromcart") {
                contentType(ContentType.Application.Json)
                headers {
                    append(HttpHeaders.Accept, "application/json")
                    append(HttpHeaders.Authorization, "Bearer ${token}")
                }
                setBody(product)
            }
            Log.i("CARTSTORE", "removeProductFromCart: ${response.bodyAsText()}")
        } catch (exception: Exception) {
            Log.e("CARTSTORE", exception.message.toString())
        }
    }
}