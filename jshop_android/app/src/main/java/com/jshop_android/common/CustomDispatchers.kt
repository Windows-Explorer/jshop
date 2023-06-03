package com.jshop_android.common

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.newSingleThreadContext

@OptIn(DelicateCoroutinesApi::class)
object CustomDispatchers {
    val validationThreadContext = newSingleThreadContext("ValidationThread")
    val navigationThreadContext = newSingleThreadContext("NavigationThread")
}