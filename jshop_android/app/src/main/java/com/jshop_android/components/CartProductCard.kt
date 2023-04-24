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
import com.jshop_android.R
import com.jshop_android.common.interfaces.ICartProduct

@Composable
fun CartProductCard(cartProduct: ICartProduct) {
    ElevatedCard(
        modifier = Modifier.padding(10.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Text(
            text = cartProduct.title,
            style = MaterialTheme.typography.labelLarge,
            fontSize = 48.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp)
        )
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(cartProduct.image)
                    .crossfade(true)
                    .build(),
                contentDescription = "Product Image",
                contentScale = ContentScale.Crop,
                placeholder = painterResource(id = R.drawable.icon_beans),
                modifier = Modifier
                    .width((300/2).dp)
                    .height((400/2).dp)
                    .clip(RoundedCornerShape(16.dp))
            )
            Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
            ElevatedButton(onClick = { /*TODO*/ }) {
                Icon(
                    Icons.Rounded.AddCircle,
                    contentDescription = "Add to cart",
                    modifier = Modifier.size(ButtonDefaults.IconSize)
                )
                Spacer(modifier = Modifier.size(ButtonDefaults.IconSpacing))
                Text(
                    text = "Удалить",
                    style = MaterialTheme.typography.displayMedium,
                    fontSize = 16.sp
                )
            }
            Spacer(modifier = Modifier.size(16.dp))
        }
    }
}