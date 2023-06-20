package com.jshop_android.activities.productActivity.screens.product

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.common.classes.Product
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.notIncrementedEvent
import com.jshop_android.store.CartStore
import com.jshop_android.store.ProductsStore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

class ProductViewModel @Inject constructor(context: Context, private val productId: Int) :
    ViewModel(),
    IEventHandler<ProductEvent> {
    private val _productViewState: MutableLiveData<ProductViewState> =
        MutableLiveData(ProductViewState.Loading)
    val productViewState: LiveData<ProductViewState> = _productViewState
    private val cartStore = CartStore(context)

    private val currentActivity = context

    override fun obtainEvent(event: ProductEvent) {
        when (val currentState = productViewState.value) {
            is ProductViewState.Loading -> reduce(event, currentState)
            is ProductViewState.Display -> reduce(event, currentState)
            is ProductViewState.Error -> reduce(event, currentState)
            else -> reduce(event, ProductViewState.Error)
        }
    }

    private fun reduce(event: ProductEvent, currentState: ProductViewState.Loading) {
        when (event) {
            is ProductEvent.EnterScreen -> getProductById()
            is ProductEvent.OutScreen -> _productViewState.postValue(ProductViewState.Loading)
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: ProductEvent, currentState: ProductViewState.Error) {
        when (event) {
            is ProductEvent.OutScreen -> _productViewState.postValue(ProductViewState.Loading)
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: ProductEvent, currentState: ProductViewState.Display) {
        when (event) {
            is ProductEvent.EnterScreen -> getProductById()
            is ProductEvent.AddProductToCart -> addProductToCart(event.product)
            is ProductEvent.OutScreen -> _productViewState.postValue(ProductViewState.Loading)
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun getProductById() {
        viewModelScope.launch(Dispatchers.IO) {
            _productViewState.postValue(ProductViewState.Loading)
            val product: Product? = ProductsStore().getById(productId)
            if (product != null) {
                _productViewState.postValue(ProductViewState.Display(product))
            } else _productViewState.postValue(ProductViewState.Error)
        }
    }

    private fun addProductToCart(product: Product) {
        viewModelScope.launch(Dispatchers.IO) {
            cartStore.addProductToCart(product)
        }
    }
}