package com.jshop_android.activities.mainActivity.screens.cart.views

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.jshop_android.activities.mainActivity.screens.cart.CartEvent
import com.jshop_android.activities.mainActivity.screens.cart.CartViewModel
import com.jshop_android.activities.mainActivity.screens.cart.CartViewState
import com.jshop_android.components.CartProductCard
import com.jshop_android.m3_pullrefresh.PullRefreshIndicator
import com.jshop_android.m3_pullrefresh.pullRefresh
import com.jshop_android.m3_pullrefresh.rememberPullRefreshState
import kotlinx.coroutines.*


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartViewDisplay(cartViewModel: CartViewModel, state: CartViewState.Display) {
    val refreshing = remember { mutableStateOf(false) }
    val refreshState = rememberPullRefreshState(refreshing.value, {
        cartViewModel.obtainEvent(CartEvent.ReloadScreen)
    })

    val isLoading = remember { mutableStateOf(false) }

    BottomSheetScaffold(
        sheetPeekHeight = 36.dp,
        sheetContainerColor = MaterialTheme.colorScheme.secondary,
        sheetContentColor = MaterialTheme.colorScheme.primary,
        sheetShadowElevation = 32.dp,
        sheetTonalElevation = 16.dp,
        containerColor = MaterialTheme.colorScheme.secondary,
        sheetContent = {
            Column(
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.padding(horizontal = 32.dp)
            ) {
                Text(
                    text = "Оформить заказ",
                    style = MaterialTheme.typography.labelLarge,
                    fontSize = 24.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.padding(16.dp))
                Text(
                    text = "Итого: ${state.totalCost} руб.",
                    style = MaterialTheme.typography.labelLarge,
                    fontSize = 24.sp,
                    textAlign = TextAlign.Left,
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.padding(16.dp))
                Button(
                    onClick = { },
                    enabled = state.cartProducts.isNotEmpty() && !isLoading.value
                ) {
                    Text(
                        text = "Оформить",
                        fontSize = 24.sp,
                        style = MaterialTheme.typography.labelLarge
                    )
                }
                Spacer(modifier = Modifier.padding(16.dp))
            }
        }) { padding ->
        Box(
            modifier = Modifier
                .pullRefresh(state = refreshState)
                .padding(padding)
        ) {
            if (state.cartProducts.isEmpty()) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(color = MaterialTheme.colorScheme.secondary)
                        .pullRefresh(refreshState)
                        .verticalScroll(rememberScrollState()),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Пусто",
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            } else {
                LazyColumn(
                    modifier = Modifier
                        .pullRefresh(refreshState)
                        .fillMaxSize()
                        .background(color = MaterialTheme.colorScheme.background)
                ) {
                    state.cartProducts.forEach { cartProduct ->
                        item {
                            val dismissState = rememberDismissState()

                            if (dismissState.isDismissed(DismissDirection.StartToEnd)) {
                                GlobalScope.launch(Dispatchers.IO) {
                                    isLoading.value = true
                                    cartViewModel.obtainEvent(
                                        CartEvent.CartProductRemoved(
                                            cartProduct
                                        )
                                    )
                                }
                            }
                            SwipeToDismiss(state = dismissState, background = {
                                val color = animateColorAsState(
                                    when (dismissState.targetValue) {
                                        DismissValue.DismissedToEnd -> MaterialTheme.colorScheme.primary
                                        else -> Color.Transparent
                                    }
                                )
                                Row(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .background(color = color.value),
                                    verticalAlignment = CenterVertically
                                ) {
                                    Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
                                    when (isLoading.value) {
                                        true -> {
                                            Column(
                                                modifier = Modifier.fillMaxSize(),
                                                verticalArrangement = Arrangement.Center,
                                                horizontalAlignment = CenterHorizontally
                                            ) {
                                                CircularProgressIndicator(
                                                    modifier = Modifier.size(42.dp),
                                                    color = MaterialTheme.colorScheme.secondary,
                                                    strokeWidth = 4.dp
                                                )
                                            }
                                        }
                                        false -> {
                                            Icon(
                                                Icons.Rounded.Delete,
                                                contentDescription = "Delete from cart",
                                                modifier = Modifier.size(36.dp),
                                                tint = MaterialTheme.colorScheme.secondary
                                            )
                                            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
                                            Text(
                                                text = "Удалить из корзины",
                                                style = MaterialTheme.typography.displayMedium,
                                                fontSize = 26.sp,
                                                color = MaterialTheme.colorScheme.secondary
                                            )
                                        }
                                    }

                                }
                            }, directions = setOf(DismissDirection.StartToEnd), dismissContent = {
                                CartProductCard(
                                    cartProduct = cartProduct,
                                    onRemove = {
                                        cartViewModel.obtainEvent(
                                            CartEvent.CartProductRemoved(
                                                cartProduct
                                            )
                                        )
                                    },
                                    onProductImage = {
                                        cartViewModel.obtainEvent(
                                            CartEvent.ProductClicked(
                                                cartProduct.product
                                            )
                                        )
                                    }
                                )
                            })
                        }
                    }
                }
            }
            PullRefreshIndicator(
                refreshing = refreshing.value,
                state = refreshState,
                modifier = Modifier.align(Alignment.TopCenter)
            )
        }
    }
}
