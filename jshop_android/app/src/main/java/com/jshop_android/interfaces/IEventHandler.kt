package com.jshop_android.interfaces

interface IEventHandler<T> {
    fun obtainEvent(event: T)
}