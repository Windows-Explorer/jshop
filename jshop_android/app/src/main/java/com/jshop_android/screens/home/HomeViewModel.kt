package com.jshop_android.screens.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jshop_android.common.classes.Product
import com.jshop_android.common.interfaces.IEventHandler
import com.jshop_android.common.interfaces.IProduct
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject


fun generateProducts(): List<IProduct> {
    val list = mutableListOf<IProduct>()
    for (i in 0..3) {
        list.add(
            Product(
                type = "Type",
                title = "Title",
                cost = i.toLong(),
                description = "description",
                image = "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666372248_54-mykaleidoscope-ru-p-kofe-i-shokolad-kartinki-krasivo-59.jpg",
            )
        )
    }
    return list
}

@HiltViewModel
class HomeViewModel @Inject constructor() : ViewModel(), IEventHandler<HomeEvent> {
    private val _homeViewState: MutableLiveData<HomeViewState> =
        MutableLiveData(HomeViewState.Loading)

    val homeViewState: LiveData<HomeViewState> = _homeViewState

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
            HomeEvent.EnterScreen -> getData()
            HomeEvent.ReloadScreen -> getData()
            else -> processError()
        }
    }

    private fun reduce(event: HomeEvent, currentState: HomeViewState.Display) {
        when (event) {
            HomeEvent.EnterScreen -> getData()
            HomeEvent.ReloadScreen -> reloadScreen()
            HomeEvent.OutScreen -> unloadData()
            else -> processError()
        }
    }

    private fun reduce(event: HomeEvent, currentState: HomeViewState.Error) {
        when (event) {
            HomeEvent.ReloadScreen -> getData()
            else -> processError()
        }
    }

    private fun processError() {
        viewModelScope.launch {
            _homeViewState.postValue(HomeViewState.Error)
        }
    }

    private fun getData() {
        viewModelScope.launch {
            delay(1000)
            _homeViewState.postValue(HomeViewState.Display(generateProducts()))
        }
    }

    private fun reloadScreen() {
        viewModelScope.launch {
            _homeViewState.postValue(HomeViewState.Loading)
            delay(1000)
            _homeViewState.postValue(HomeViewState.Display(generateProducts()))
        }
    }

    private fun unloadData() {
        viewModelScope.launch {
            _homeViewState.postValue(HomeViewState.Loading)
        }
    }
}