package com.jshop_android.common.classes

@kotlinx.serialization.Serializable()
data class UserSignIn(val email: String, val password: String)