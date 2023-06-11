package com.jshop_android.activities.productActivity

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.jshop_android.activities.productActivity.screens.ProductScreen
import com.jshop_android.activities.productActivity.screens.product.ProductViewModel
import com.jshop_android.components.TopBarProduct
import com.jshop_android.ui.theme.Jshop_androidTheme

class ProductActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val productId: Int = intent.getIntExtra("productId", 0)
        val productViewModel = ProductViewModel(this, productId)

        setContent {
            Jshop_androidTheme {
                MaterialTheme() {
                    Scaffold(
                        topBar = {
                            TopBarProduct()
                        }
                    ) { padding ->
                        Surface(modifier = Modifier.padding(padding)) {
                            ProductScreen(productViewModel = productViewModel)
                        }
                    }
                }
            }
        }
    }
}