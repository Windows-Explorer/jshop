package com.jshop_android.screens.home.views

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.jshop_android.common.interfaces.IProduct
import com.jshop_android.components.ProductCard

@Composable
fun HomeViewDisplay(products: List<IProduct>) {
    var scrollState = rememberScrollState()
    Column(
        modifier = Modifier.verticalScroll(scrollState)
    ) {
        products.forEach { product ->
            ProductCard(product = product)
        }
    }
}