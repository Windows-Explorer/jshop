package com.jshop_android.activities.mainActivity.screens.home

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
import com.jshop_android.common.store.ProductsStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(context: Context) : ViewModel(), IEventHandler<HomeEvent> {
    private val _homeViewState: MutableLiveData<HomeViewState> =
        MutableLiveData(HomeViewState.Loading)

    val homeViewState: LiveData<HomeViewState> = _homeViewState
    private val productsStore = ProductsStore()
    private val cartStore = CartStore(context)

    @SuppressLint("StaticFieldLeak")
    private val currentActivity = context

    override fun obtainEvent(event: HomeEvent) {
        when (val currentState = homeViewState.value) {
            is HomeViewState.Loading -> reduce(event, currentState)
            is HomeViewState.Display -> reduce(event, currentState)
            is HomeViewState.Error -> reduce(event, currentState)
            else -> reduce(event, HomeViewState.Error)
        }
    }

    private fun reduce(event: HomeEvent, currentState: HomeViewState.Loading) {
        when (event) {
            is HomeEvent.EnterScreen -> getProducts()
            is HomeEvent.ReloadScreen -> getProducts()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: HomeEvent, currentState: HomeViewState.Display) {
        when (event) {
            is HomeEvent.EnterScreen -> getProducts()
            is HomeEvent.ReloadScreen -> getProducts()
            is HomeEvent.AddProductToCart -> addProductToCart(event.product)
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: HomeEvent, currentState: HomeViewState.Error) {
        when (event) {
            HomeEvent.ReloadScreen -> getProducts()
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun getProducts() {
        viewModelScope.launch(Dispatchers.IO) {
            _homeViewState.postValue(HomeViewState.Loading)
            delay(1000)
            _homeViewState.postValue(HomeViewState.Display(productsStore.getProducts()))
        }
    }

    private fun addProductToCart(product: Product) {
        viewModelScope.launch(Dispatchers.IO) {
            cartStore.addProductToCart(product)
        }
    }
}