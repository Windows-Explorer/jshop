package com.jshop_android.common.classes

import com.jshop_android.common.interfaces.IProduct

data class Product(
    override val id: Long,
    override val title: String,
    override val description: String,
    override val image: String,
    override val cost: Long,
    override val type: String
) : IProduct {
    constructor(title: String, description: String, image: String, cost: Long, type: String) : this(
        Long.MIN_VALUE,
        title,
        description,
        image,
        cost,
        type
    )
}