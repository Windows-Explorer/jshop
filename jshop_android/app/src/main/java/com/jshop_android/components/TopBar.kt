package com.jshop_android.components

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
@Preview
fun TopBar() {
    TopAppBar(
        title = {
            Text(
                text = "Beans",
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                fontSize = 24.sp,
                style = MaterialTheme.typography.labelLarge
            )
        },
        modifier = Modifier.shadow(elevation = 4.dp)
    )
}