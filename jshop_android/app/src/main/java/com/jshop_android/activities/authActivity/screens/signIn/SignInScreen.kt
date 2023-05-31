package com.jshop_android.activities.authActivity.screens.signIn

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.jshop_android.common.classes.UserSignIn
import com.jshop_android.components.BeansLogo

@OptIn(ExperimentalMaterial3Api::class)
@Composable()
fun SignInScreen(signInViewModel: SignInViewModel) {
    val viewState = signInViewModel.signInViewState.observeAsState()

    var email by remember { mutableStateOf(TextFieldValue("")) }
    var password by remember { mutableStateOf(TextFieldValue("")) }

    Surface(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            BeansLogo()
            Spacer(modifier = Modifier.padding(24.dp))
            TextField(
                value = email,
                onValueChange = {
                    email = it
                },
                label = {
                    Text(
                        text = "Электронная почта",
                        fontSize = 16.sp,
                        style = MaterialTheme.typography.displayMedium
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Email,
                        contentDescription = "emailIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                textStyle = TextStyle(fontSize = 16.sp),
                modifier = Modifier.width(300.dp),
                shape = CircleShape,
                singleLine = true,
                colors = TextFieldDefaults.textFieldColors(
                    disabledTextColor = Color.Transparent,
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    containerColor = MaterialTheme.colorScheme.background,
                    focusedTextColor = MaterialTheme.colorScheme.primary,
                    unfocusedTextColor = MaterialTheme.colorScheme.primary,
                    cursorColor = MaterialTheme.colorScheme.primary,
                    unfocusedLabelColor = MaterialTheme.colorScheme.primary,
                    focusedLabelColor = MaterialTheme.colorScheme.primary,
                )
            )
            Spacer(modifier = Modifier.padding(12.dp))
            TextField(
                visualTransformation = PasswordVisualTransformation(),
                value = password,
                onValueChange = {
                    password = it
                },
                label = {
                    Text(
                        text = "Пароль",
                        fontSize = 16.sp,
                        style = MaterialTheme.typography.displayMedium
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Lock,
                        contentDescription = "emailIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                textStyle = TextStyle(fontSize = 16.sp),
                modifier = Modifier.width(300.dp),
                shape = CircleShape,
                colors = TextFieldDefaults.textFieldColors(
                    disabledTextColor = Color.Transparent,
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    containerColor = MaterialTheme.colorScheme.background,
                    focusedTextColor = MaterialTheme.colorScheme.primary,
                    unfocusedTextColor = MaterialTheme.colorScheme.primary,
                    cursorColor = MaterialTheme.colorScheme.primary,
                    unfocusedLabelColor = MaterialTheme.colorScheme.primary,
                    focusedLabelColor = MaterialTheme.colorScheme.primary,
                )
            )
            Spacer(modifier = Modifier.padding(12.dp))
            Button(
                onClick = {
                    signInViewModel.obtainEvent(
                        SignInEvent.SignIn(
                            UserSignIn(
                                email.text,
                                password.text
                            )
                        )
                    )
                },
                enabled = viewState.value == SignInViewState.Display
            ) {
                when (viewState.value) {
                    is SignInViewState.Loading -> CircularProgressIndicator(
                        color = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(18.dp)
                    )
                    else -> Text(
                        text = "ВОЙТИ",
                        fontSize = 18.sp,
                        style = MaterialTheme.typography.labelLarge
                    )
                }
                if (viewState.value == SignInViewState.Error) {
                    AlertDialog(
                        onDismissRequest = {
                            signInViewModel.obtainEvent(SignInEvent.DialogDismissed)
                        }
                    ) {
                        Card(
                            shape = RoundedCornerShape(16.dp),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondary)
                        ) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Center,
                                modifier = Modifier.padding(32.dp)
                            ) {
                                Text(
                                    text = "Не удалось войти",
                                    fontSize = 16.sp,
                                    style = MaterialTheme.typography.labelLarge,
                                    color = MaterialTheme.colorScheme.primary
                                )
                                Spacer(modifier = Modifier.padding(12.dp))
                                Text(
                                    text = "Электронная почта или пароль введены неверно",
                                    fontSize = 14.sp,
                                    style = MaterialTheme.typography.displayMedium,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
