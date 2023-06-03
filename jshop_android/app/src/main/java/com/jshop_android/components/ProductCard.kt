package com.jshop_android.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AddCircle
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.jshop_android.activities.mainActivity.screens.home.HomeEvent
import com.jshop_android.activities.mainActivity.screens.home.HomeViewModel
import com.jshop_android.common.classes.Product

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductCard(product: Product, homeViewModel: HomeViewModel) {
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
                contentScale = ContentScale.Crop,
                placeholder = painterResource(id = com.jshop_android.R.drawable.icon_beans),
                modifier = Modifier
                    .width(300.dp)
                    .height(400.dp)
                    .clip(RoundedCornerShape(16.dp))
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            ElevatedButton(onClick = {
                homeViewModel.obtainEvent(HomeEvent.AddProductToCart(product))
            }) {
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