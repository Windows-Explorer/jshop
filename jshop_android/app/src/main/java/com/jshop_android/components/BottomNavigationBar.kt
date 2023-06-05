package com.jshop_android.components

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.jshop_android.activities.mainActivity.navigation.NavigationItem

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomNavigationBar(navController: NavController) {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.secondary,
        modifier = Modifier.shadow(elevation = 4.dp)
    ) {
        var selectedItem = remember { mutableStateOf(0) }

        val items = listOf<NavigationItem>(
            NavigationItem.Home,
            NavigationItem.Cart,
            NavigationItem.Account,
        )

        items.forEachIndexed { index, item ->
            NavigationBarItem(
                selected = selectedItem.value == index,
                icon = {
                    BadgedBox(
                        badge = {
                            if (item.badge.isNotEmpty()) {
                                val badgeText = remember { mutableStateOf(item.badge) }

                                Badge(
                                    containerColor = MaterialTheme.colorScheme.tertiary
                                ) {
                                    Text(
                                        text = badgeText.value,
                                        style = MaterialTheme.typography.displayMedium,
                                    )
                                }
                            }
                        }) {
                        Icon(
                            item.icon,
                            contentDescription = item.title,
                        )
                    }
                },
                label = {
                    Text(text = item.title, style = MaterialTheme.typography.displayMedium)
                },
                colors = NavigationBarItemDefaults.colors(
                    indicatorColor = MaterialTheme.colorScheme.primary,
                    selectedIconColor = MaterialTheme.colorScheme.secondary
                ),
                enabled = true,
                onClick = {
                    navController.navigate(route = item.route)
                    selectedItem.value = index
                }
            )
        }
    }
}