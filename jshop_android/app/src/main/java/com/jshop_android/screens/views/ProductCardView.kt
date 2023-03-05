package com.jshop_android.screens.views

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ProductCardView(items: List<Int>) {
    Column(Modifier.fillMaxSize().padding(10.dp)) {
        Card(Modifier
            .fillMaxWidth()
//            .height(100.dp)
        ) {
            Column(Modifier
                .padding(20.dp)
            ) {
                Text(text = "Час на чек, читаем рэп, как логопед под марафетом", fontSize = 40.sp)
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    ProductCardView(items = listOf(1,1,1,1))
}