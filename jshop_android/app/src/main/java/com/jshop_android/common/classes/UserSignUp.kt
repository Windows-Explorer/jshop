package com.jshop_android.common.classes

@kotlinx.serialization.Serializable()
data class UserSignUp(
    val email: String, val password: String, val username: String, val phoneNumber: String
)