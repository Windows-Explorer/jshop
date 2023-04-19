package com.jshop_android.components

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Add
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.jshop_android.common.classes.Product
import com.jshop_android.common.interfaces.IProduct

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductCard(product: IProduct) {
    ListItem(
        headlineText = {
            Text(text = "One line list item with 24x24 icon")
        },
        leadingContent = {
            Icon(Icons.Rounded.Add, contentDescription = "test")
        },
        colors = ListItemDefaults.colors(
            containerColor = MaterialTheme.colorScheme.secondary
        ),
        modifier = Modifier
            .padding(4.dp)
            .shadow(elevation = 1.dp)
    )
}

@Composable
@Preview
fun ProductCardPreview() {
    val product: IProduct =
        Product(
            title = "Title",
            description = "Description",
            image = "Image",
            cost = 1000,
            type = "Type"
        )
    ProductCard(product = product)
}