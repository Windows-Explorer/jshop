package com.jshop_android.common

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.newSingleThreadContext

@OptIn(DelicateCoroutinesApi::class)
object CustomThreads {
    val validationThreadContext = newSingleThreadContext("ValidationThread")
}