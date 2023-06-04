package com.jshop_android.common.classes

@kotlinx.serialization.Serializable
data class CartProduct(
    val product: Product,
    var count: Int
)
