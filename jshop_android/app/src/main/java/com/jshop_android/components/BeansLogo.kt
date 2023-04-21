package com.jshop_android.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable()
fun BeansLogo(size: Dp = 160.dp, labelSize: TextUnit = 36.sp, subLabel: TextUnit = 10.sp) {
    Box(
        modifier = Modifier
            .height(size)
            .width(size)
            .background(color = Color.Transparent)
            .border(
                shape = RoundedCornerShape(size),
                color = MaterialTheme.colorScheme.primary,
                width = 2.dp
            )
    ) {
        Column(
            modifier = Modifier
                .align(Alignment.Center)
                .fillMaxSize(),
            verticalArrangement = Arrangement.Center
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center,
                modifier = Modifier.fillMaxWidth()
            ) {
                Image(
                    imageVector = ImageVector.vectorResource(id = com.jshop_android.R.drawable.icon_beans),
                    contentDescription = "Coffee Beans Icon",
                    modifier = Modifier.size(36.dp)
                )
            }
            Text(
                text = "Beans",
                style = MaterialTheme.typography.labelLarge,
                fontSize = labelSize,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
            Text(
                text = "Coffee Production",
                fontSize = subLabel,
                textAlign = TextAlign.Center,
                style = MaterialTheme.typography.displayMedium,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 10.dp)
            )
            Text(
                text = "EST. 2003",
                fontSize = subLabel,
                textAlign = TextAlign.Center,
                style = MaterialTheme.typography.displayMedium,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 10.dp)
            )
        }
    }
}

@Preview()
@Composable()
fun BeansLogoPreview() {
    BeansLogo(size = 160.dp)
}