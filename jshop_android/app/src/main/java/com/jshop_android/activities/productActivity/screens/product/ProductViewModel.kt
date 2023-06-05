package com.jshop_android.activities.productActivity.screens.product

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.notIncrementedEvent
import javax.inject.Inject

class ProductViewModel @Inject constructor(context: Context) : ViewModel(),
    IEventHandler<ProductEvent> {
    private val _productViewState: MutableLiveData<ProductViewState> =
        MutableLiveData(ProductViewState.Loading)
    val productViewState: LiveData<ProductViewState> = _productViewState

    private val currentActivity = context

    override fun obtainEvent(event: ProductEvent) {
        when (val currentState = productViewState.value) {
            else -> println("WIP")
        }
    }

    private fun reduce(event: ProductEvent, currentState: ProductViewState.Loading) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: ProductEvent, currentState: ProductViewState.Error) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }

    private fun reduce(event: ProductEvent, currentState: ProductViewState.Display) {
        when (event) {
            else -> notIncrementedEvent(event, currentState)
        }
    }
}