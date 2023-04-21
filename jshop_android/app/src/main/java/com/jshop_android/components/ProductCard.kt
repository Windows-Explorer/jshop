package com.jshop_android.components

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AddCircle
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.jshop_android.common.classes.Product
import com.jshop_android.common.interfaces.IProduct

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductCard(product: IProduct) {
    ElevatedCard(
        modifier = Modifier.padding(10.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Text(
            text = product.title,
            style = MaterialTheme.typography.labelLarge,
            fontSize = 48.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp)
        )
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(product.image)
                    .crossfade(true)
                    .build(),
                contentDescription = "Product Image",
                placeholder = painterResource(id = com.jshop_android.R.drawable.icon_beans),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(240.dp)
                    .border(
                        width = 0.dp,
                        color = Color.Transparent,
                        shape = MaterialTheme.shapes.large
                    )
            )

            ElevatedButton(onClick = { /*TODO*/ }) {
                Icon(
                    Icons.Rounded.AddCircle,
                    contentDescription = "Add to cart",
                    modifier = Modifier.size(ButtonDefaults.IconSize)
                )
                Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
                Text(
                    text = "Добавить",
                    style = MaterialTheme.typography.displayMedium,
                    fontSize = 16.sp
                )
            }
            Spacer(modifier = Modifier.size(16.dp))
        }
    }
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
    Surface(modifier = Modifier.fillMaxSize()) {
        ProductCard(product = product)
    }
}