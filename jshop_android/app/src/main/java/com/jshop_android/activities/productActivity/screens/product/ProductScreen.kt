package com.jshop_android.activities.productActivity.screens

import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.jshop_android.activities.productActivity.screens.product.ProductViewModel
import com.jshop_android.common.classes.Product

@Composable
fun ProductScreen(productViewModel: ProductViewModel, product: Product) {
    val viewState = productViewModel.productViewState.observeAsState()


}