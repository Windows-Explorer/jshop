package com.jshop_android.activities.mainActivity.screens.cart.views

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.jshop_android.components.CartProductCard
import com.jshop_android.m3_pullrefresh.PullRefreshIndicator
import com.jshop_android.m3_pullrefresh.pullRefresh
import com.jshop_android.m3_pullrefresh.rememberPullRefreshState
import com.jshop_android.activities.mainActivity.screens.cart.CartEvent
import com.jshop_android.activities.mainActivity.screens.cart.CartViewModel
import com.jshop_android.activities.mainActivity.screens.cart.CartViewState


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartViewDisplay(cartViewModel: CartViewModel, state: CartViewState.Display) {
    val refreshing = remember { mutableStateOf(false) }
    val refreshState = rememberPullRefreshState(refreshing.value, {
        cartViewModel.obtainEvent(CartEvent.ReloadScreen)
    })
    val cartProducts = remember { mutableStateOf(state.cartProducts) }

    Box(modifier = Modifier.pullRefresh(state = refreshState)) {
        LazyColumn(
            modifier = Modifier.pullRefresh(refreshState)
        ) {
            state.cartProducts.forEachIndexed { index, cartProduct ->
                item {
                    val dismissState = rememberDismissState()

                    if (dismissState.isDismissed(DismissDirection.StartToEnd)) {
                        cartViewModel.obtainEvent(CartEvent.CartProductRemoved(index))
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
                            Icon(
                                Icons.Rounded.Delete,
                                contentDescription = "Delete from cart",
                                modifier = Modifier.size(36.dp),
                                tint = MaterialTheme.colorScheme.secondary
                            )
                            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
                            Text(
                                text = "Убрать из корзины",
                                style = MaterialTheme.typography.displayMedium,
                                fontSize = 26.sp,
                                color = MaterialTheme.colorScheme.secondary
                            )
                        }
                    }, directions = setOf(DismissDirection.StartToEnd), dismissContent = {
                        CartProductCard(
                            cartProduct = cartProduct,
                            cartViewModel = cartViewModel,
                            index = index
                        )
                    })
                    Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
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