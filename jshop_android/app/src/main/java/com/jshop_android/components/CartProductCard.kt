package com.jshop_android.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.jshop_android.R
import com.jshop_android.activities.mainActivity.screens.cart.CartEvent
import com.jshop_android.activities.mainActivity.screens.cart.CartViewModel
import com.jshop_android.common.classes.CartProduct

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartProductCard(cartProduct: CartProduct, cartViewModel: CartViewModel) {
    val text = remember { mutableStateOf(cartProduct.count) }
    val dismissState = rememberDismissState()


    ElevatedCard(
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondary),
        shape = RectangleShape
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Spacer(modifier = Modifier.size(8.dp))
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current).data(cartProduct.product.image)
                    .crossfade(true).build(),
                contentDescription = "Product Image",
                contentScale = ContentScale.FillHeight,
                placeholder = painterResource(id = R.drawable.icon_beans),
                modifier = Modifier
                    .width(120.dp)
                    .height(120.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(color = MaterialTheme.colorScheme.background)
                    .padding(16.dp)
            )
            Spacer(modifier = Modifier.size(8.dp))
            Column(
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                Spacer(modifier = Modifier.size(16.dp))
                Text(
                    text = cartProduct.product.title,
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary,
                    fontSize = 24.sp,
                    textAlign = TextAlign.Center,
                    lineHeight = 28.sp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(10.dp),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "Всего: ${cartProduct.product.cost * cartProduct.count} руб.",
                    style = MaterialTheme.typography.displayMedium,
                    color = MaterialTheme.colorScheme.primary,
                    fontSize = 24.sp,
                    textAlign = TextAlign.Left,
                    modifier = Modifier
                        .fillMaxWidth(),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                TextField(
                    value = text.value.toString(),
                    onValueChange = { newValue ->
                        try {
                            text.value = newValue.toInt()
                        } catch (exception: Exception) {
                            text.value = 1
                        }
                    },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    keyboardActions = KeyboardActions(onDone = {
                        if (text.value == 0) {
                            cartViewModel.obtainEvent(CartEvent.CartProductRemoved(cartProduct))
                        }
                        cartProduct.count = text.value
                    }, onGo = {
                        text.value = 1
                    }),
                    label = {
                        Text(text = "Количество")
                    },
                    singleLine = true,
                    colors = TextFieldDefaults.colors(
                        unfocusedContainerColor = MaterialTheme.colorScheme.secondary,
                        focusedContainerColor = MaterialTheme.colorScheme.secondary
                    )
                )
                Spacer(modifier = Modifier.size(16.dp))
            }
            Spacer(modifier = Modifier.size(8.dp))
        }
    }
}