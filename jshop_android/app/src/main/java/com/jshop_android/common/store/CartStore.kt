package com.jshop_android.common.store

import android.content.Context
import android.util.Log
import com.auth0.android.jwt.JWT
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
            val jwt = JWT(token)
            val userEmail = jwt.getClaim("email").toString()

            val cart: MutableList<CartProduct> = getCart().toMutableList()

            if (product in cart.map { it.product }) {
                cart[cart.map { it.product }.indexOf(product)].count++
            } else {
                val cartProduct = CartProduct(
                    userEmail = userEmail,
                    product = product,
                    count = 1
                )
                cart.add(cartProduct)
            }
            saveCart(cart)
        } catch (exception: Exception) {
            Log.e("CARTSTORE", exception.message.toString())
        }
    }

    private suspend fun saveCart(cart: List<CartProduct>) {
        try {
            val token = userStore.getToken.first()
            val response = client.post("${ParamsAPI.API_host}/cart/save") {
                contentType(ContentType.Application.Json)
                setBody(cart)
                headers {
                    append(HttpHeaders.Authorization, "Bearer ${token}")
                    append(HttpHeaders.Accept, "application/json")
                }
            }
            Log.i("CARTSTORE", "saveCart: ${response.bodyAsText()}")
        } catch (exception: Exception) {
            Log.e("CARTSTORE", exception.message.toString())
        }
    }
}