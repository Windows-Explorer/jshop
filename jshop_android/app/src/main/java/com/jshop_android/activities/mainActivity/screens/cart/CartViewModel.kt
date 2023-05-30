package com.jshop_android.activities.mainActivity.screens.cart

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.common.classes.CartProduct
import com.jshop_android.common.interfaces.ICartProduct
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.activities.mainActivity.screens.home.generateProducts
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CartViewModel @Inject constructor() : ViewModel(), IEventHandler<CartEvent> {
    private val _cartViewState: MutableLiveData<CartViewState> =
        MutableLiveData(CartViewState.Loading)
    val cartViewState: LiveData<CartViewState> = _cartViewState

    override fun obtainEvent(event: CartEvent) {
        when (val currentState = cartViewState.value) {
            is CartViewState.Loading -> reduce(event, currentState)
            is CartViewState.Display -> reduce(event, currentState)
            is CartViewState.Error -> reduce(event, currentState)
            else -> processError()
        }
    }

    private fun reduce(event: CartEvent, currentState: CartViewState.Loading) {
        when (event) {
            is CartEvent.EnterScreen -> getCart()
            is CartEvent.OutScreen -> unloadData()
            else -> processError()
        }
    }

    private fun reduce(event: CartEvent, currentState: CartViewState.Display) {
        when (event) {
            is CartEvent.EnterScreen -> getCart()
            is CartEvent.OutScreen -> unloadData()
            is CartEvent.CartProductRemoved -> removeCartProduct(event, currentState)
            is CartEvent.CartProductCountUpdated -> uploadCart(event)
            is CartEvent.ReloadScreen -> reloadScreen(currentState)
            else -> processError()
        }
    }

    private fun reduce(event: CartEvent, currentState: CartViewState.Error) {
        when (event) {
            is CartEvent.EnterScreen -> getCart()
            is CartEvent.OutScreen -> unloadData()
            else -> processError()
        }
    }

    private fun getCart() {
        viewModelScope.launch {
            delay(1000)
            val cartProductsList = mutableListOf<ICartProduct>()
            for (product in generateProducts()) {
                cartProductsList.add(CartProduct(product))
            }
            _cartViewState.postValue(CartViewState.Display(cartProductsList))
        }
    }

    private fun unloadData() {
        GlobalScope.launch {
            _cartViewState.postValue(CartViewState.Loading)
        }
    }

    private fun uploadCart(event: CartEvent.CartProductCountUpdated) {
        viewModelScope.launch {
            println(event.cartProduct)
        }
    }

    private fun removeCartProduct(
        event: CartEvent.CartProductRemoved,
        state: CartViewState.Display
    ) {
        viewModelScope.launch {
            state.cartProducts.removeAt(event.index)
            reloadScreen(state = state)
        }
    }

    private fun reloadScreen(state: CartViewState.Display) {
        viewModelScope.launch {
            _cartViewState.postValue(CartViewState.Loading)
            delay(1000)
            _cartViewState.postValue(CartViewState.Display(state.cartProducts))
        }
    }

    private fun processError() {
        viewModelScope.launch {
            _cartViewState.postValue(CartViewState.Error)
        }
    }
}