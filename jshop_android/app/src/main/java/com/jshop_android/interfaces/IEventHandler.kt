package com.jshop_android.common.interfaces

interface IEventHandler<T> {
    fun obtainEvent(event: T)
}