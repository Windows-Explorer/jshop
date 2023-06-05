package com.jshop_android.components

import android.content.Context
import android.content.Intent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AddCircle
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.jshop_android.activities.mainActivity.screens.home.HomeEvent
import com.jshop_android.activities.mainActivity.screens.home.HomeViewModel
import com.jshop_android.activities.productActivity.ProductActivity
import com.jshop_android.common.CustomDispatchers
import com.jshop_android.common.classes.Product
import kotlinx.coroutines.*

@OptIn(ExperimentalMaterial3Api::class, DelicateCoroutinesApi::class)
@Composable
fun ProductCard(product: Product, homeViewModel: HomeViewModel) {
    val isLoading = remember { mutableStateOf(false) }
    val currentContext = LocalContext.current

    fun openProduct() {
        GlobalScope.launch(CustomDispatchers.navigationThreadContext) {
            val intent = Intent(currentContext, ProductActivity::class.java)
            intent.putExtra("productId", product.id)
            currentContext.startActivity(intent)
        }
    }

    ElevatedCard(
        modifier = Modifier.padding(10.dp), colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
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
                    .clickable {
                        openProduct()
                    }
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            Text(
                text = product.title,
                style = MaterialTheme.typography.labelLarge,
                fontSize = 32.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth(),
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                lineHeight = 36.sp
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            Text(
                text = product.description,
                style = MaterialTheme.typography.displayMedium,
                fontSize = 16.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth(),
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            Text(
                text = "${product.cost} руб.",
                style = MaterialTheme.typography.displayMedium,
                fontSize = 24.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth(),
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            ElevatedButton(onClick = {
                runBlocking(CustomDispatchers.retardedThreadContext) {
                    GlobalScope.launch(CustomDispatchers.retardedThreadContext) {
                        homeViewModel.obtainEvent(HomeEvent.AddProductToCart(product))
                        isLoading.value = true
                        delay(500)
                        isLoading.value = false
                    }
                }
            }) {
                when (isLoading.value) {
                    false -> {
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
                    true -> {
                        CircularProgressIndicator(
                            modifier = Modifier.size(16.dp),
                            color = MaterialTheme.colorScheme.primary,
                            strokeWidth = 2.dp
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.size(24.dp))
        }
    }
}