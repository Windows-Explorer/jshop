package com.jshop_android.activities.productActivity.screens.product.views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.jshop_android.R
import com.jshop_android.activities.productActivity.screens.product.ProductEvent
import com.jshop_android.activities.productActivity.screens.product.ProductViewModel
import com.jshop_android.activities.productActivity.screens.product.ProductViewState
import com.jshop_android.common.CustomDispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

@Composable
fun ProductViewDisplay(productViewModel: ProductViewModel, state: ProductViewState.Display) {
    val isLoading = remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(color = MaterialTheme.colorScheme.secondary)
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current).data(state.product.image)
                .crossfade(true).build(),
            contentDescription = "Product Image",
            contentScale = ContentScale.FillHeight,
            placeholder = painterResource(id = R.drawable.icon_beans),
            modifier = Modifier
                .width(200.dp)
                .height(200.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(color = MaterialTheme.colorScheme.background)
                .padding(16.dp)
        )
        Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
        Text(
            text = state.product.title,
            style = MaterialTheme.typography.labelLarge,
            fontSize = 32.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth(),
            lineHeight = 36.sp
        )
        Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
        Text(
            text = state.product.description,
            style = MaterialTheme.typography.displayMedium,
            fontSize = 16.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth(),
        )
        Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
        Text(
            text = "${state.product.cost} руб.",
            style = MaterialTheme.typography.displayMedium,
            fontSize = 24.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth(),
        )
        Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
        ElevatedButton(onClick = {
            runBlocking(CustomDispatchers.retardedThreadContext) {
                GlobalScope.launch(CustomDispatchers.retardedThreadContext) {
                    productViewModel.obtainEvent(ProductEvent.AddProductToCart(state.product))
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
    }
}