package com.jshop_android.components

import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FormTextField(
    visualTransformation: VisualTransformation = VisualTransformation.None,
    value: TextFieldValue,
    onValueChange: (TextFieldValue) -> Unit,
    label: String,
    leadingIcon: @Composable() (() -> Unit)?,
    keyboardOptions: KeyboardOptions,
    isError: Boolean,
    enabled: Boolean
) {
    TextField(
        visualTransformation = visualTransformation,
        value = value,
        onValueChange = onValueChange,
        label = {
            Text(
                text = label,
                fontSize = 16.sp,
                style = MaterialTheme.typography.displayMedium
            )
        },
        leadingIcon = leadingIcon,
        keyboardOptions = keyboardOptions,
        textStyle = TextStyle(fontSize = 16.sp),
        modifier = Modifier.width(300.dp),
        shape = CircleShape,
        colors = TextFieldDefaults.textFieldColors(
            focusedIndicatorColor = Color.Transparent,
            unfocusedIndicatorColor = Color.Transparent,
            disabledIndicatorColor = Color.Transparent,
            errorIndicatorColor = Color.Transparent,
            containerColor = MaterialTheme.colorScheme.background,
            focusedTextColor = MaterialTheme.colorScheme.primary,
            unfocusedTextColor = MaterialTheme.colorScheme.primary,
            cursorColor = MaterialTheme.colorScheme.primary,
            unfocusedLabelColor = MaterialTheme.colorScheme.primary,
            focusedLabelColor = MaterialTheme.colorScheme.primary,
        ),
        isError = isError,
        enabled = enabled
    )
}