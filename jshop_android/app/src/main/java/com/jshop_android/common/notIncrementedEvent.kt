package com.jshop_android.common

fun notIncrementedEvent(event: Any, state: Any) {
    println("${state.toString()}: Event ${event.toString()} is not incremented")
}