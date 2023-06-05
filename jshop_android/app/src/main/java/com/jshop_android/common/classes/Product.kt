package com.jshop_android.common.classes

@kotlinx.serialization.Serializable
data class Product(
    val id: Int,
    val title: String,
    val description: String,
    val image: String,
    val cost: Int,
    val isTop: Boolean,
    val category: Category?
)