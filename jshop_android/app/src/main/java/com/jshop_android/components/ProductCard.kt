package com.jshop_android.components

import androidx.compose.foundation.background
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
fun ProductCard(product: Product, homeViewModel: HomeViewModel, isLoading: Boolean) {
    ElevatedCard(
        modifier = Modifier.padding(10.dp), colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.size(24.dp))
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current).data(product.image)
                    .crossfade(true).build(),
                contentDescription = "Product Image",
                contentScale = ContentScale.FillHeight,
                placeholder = painterResource(id = com.jshop_android.R.drawable.icon_beans),
                modifier = Modifier
                    .width(200.dp)
                    .height(200.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(color = MaterialTheme.colorScheme.background)
                    .padding(16.dp)
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            Text(
                text = product.title,
                style = MaterialTheme.typography.labelLarge,
                fontSize = 32.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            Text(
                text = product.description,
                style = MaterialTheme.typography.displayMedium,
                fontSize = 16.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
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
                    text = "Добавить в корзину",
                    style = MaterialTheme.typography.displayMedium,
                    fontSize = 16.sp
                )
            }
            Spacer(modifier = Modifier.size(24.dp))
        }
    }
}