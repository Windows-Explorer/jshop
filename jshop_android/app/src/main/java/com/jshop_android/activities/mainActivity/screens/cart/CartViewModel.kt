package com.jshop_android.activities.mainActivity.screens.cart

import android.annotation.SuppressLint
import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.common.classes.Product
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.notIncrementedEvent
import com.jshop_android.common.store.CartStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CartViewModel @Inject constructor(context: Context) : ViewModel(), IEventHandler<CartEvent> {
    private val _cartViewState: MutableLiveData<CartViewState> =
        MutableLiveData(CartViewState.Loading)

    val cartViewState: LiveData<CartViewState> = _cartViewState
    private val cartStore = CartStore(context)

    @SuppressLint("StaticFieldLeak")
    private val currentActivity = context

    override fun obtainEvent(event: CartEvent) {
        when (val currentState = cartViewState.value) {
            is CartViewState.Loading -> reduce(event, currentState)
            is CartViewState.Display -> reduce(event, currentState)
            is CartViewState.Error -> reduce(event, currentState)
            else -> reduce(event, CartViewState.Error)
        }
    }

    private fun reduce(event: CartEvent, currentState: CartViewState.Loading) {
        when (event) {
            is CartEvent.EnterScreen -> getCart()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: CartEvent, currentState: CartViewState.Display) {
        when (event) {
            is CartEvent.EnterScreen -> getCart()
            is CartEvent.CartProductRemoved -> removeProductFromCart(event.cartProduct.product)
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: CartEvent, currentState: CartViewState.Error) {
        when (event) {
            is CartEvent.EnterScreen -> getCart()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun getCart() {
        viewModelScope.launch(Dispatchers.IO) {
            _cartViewState.postValue(CartViewState.Loading)
            _cartViewState.postValue(CartViewState.Display(cartStore.getCart().toMutableList()))
        }
    }

    private fun removeProductFromCart(product: Product) {
        viewModelScope.launch(Dispatchers.IO) {
            _cartViewState.postValue(CartViewState.Loading)
            cartStore.removeProductFromCart(product)
            _cartViewState.postValue(CartViewState.Display(cartStore.getCart().toMutableList()))
        }
    }
}