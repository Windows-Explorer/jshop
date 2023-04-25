package com.jshop_android.common.classes

import com.jshop_android.common.interfaces.ICartProduct
import com.jshop_android.common.interfaces.IProduct

data class CartProduct(
    override val id: Long,
    override val title: String,
    override val description: String,
    override val image: String,
    override val cost: Long,
    override val type: String,
    override var count: Int = 1
) : ICartProduct {
    constructor(product: IProduct) : this(
        Long.MIN_VALUE,
        product.title,
        product.description,
        product.image,
        product.cost,
        product.type
    )

}
