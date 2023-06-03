package com.jshop_android.common.classes

@kotlinx.serialization.Serializable
data class Category(
    val id: Int,
    val name: String,
    val description: String
)