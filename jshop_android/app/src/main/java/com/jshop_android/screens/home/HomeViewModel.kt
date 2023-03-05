package com.jshop_android.screens.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.jshop_android.interfaces.IEventHandler
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor() : ViewModel(), IEventHandler<HomeEvent> {

    private val _homeViewState: MutableLiveData<HomeViewState> = MutableLiveData(HomeViewState.Loading)
    val homeViewState: LiveData<HomeViewState> = _homeViewState

    override fun obtainEvent(event: HomeEvent) {
        when (val currentState = _homeViewState.value) {
            is HomeViewState.Loading -> reduce(event, currentState)
            else -> throw UnknownError()
        }
    }

    private fun reduce(event: HomeEvent, currentState: HomeViewState.Loading) {
        when (event) {
            HomeEvent.EnterScreen -> println("working")
            else -> throw UnknownError()
        }
    }
}