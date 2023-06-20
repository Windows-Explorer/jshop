package com.jshop_android.activities.authActivities.signInActivity.screens.signIn

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.ClickableText
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.jshop_android.common.classes.UserSignIn
import com.jshop_android.components.BeansLogo
import com.jshop_android.components.FormTextField

@Composable()
fun SignInScreen(signInViewModel: SignInViewModel) {
    val systemUiController = rememberSystemUiController()
    systemUiController.setSystemBarsColor(color = MaterialTheme.colorScheme.secondary)

    val viewState = signInViewModel.signInViewState.observeAsState()

    var email by remember { mutableStateOf(TextFieldValue("")) }
    var password by remember { mutableStateOf(TextFieldValue("")) }

    Surface(
        modifier = Modifier
            .fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier
                .verticalScroll(rememberScrollState())
                .fillMaxSize()
        ) {
            BeansLogo()
            Spacer(modifier = Modifier.padding(24.dp))
            FormTextField(
                value = email,
                onValueChange = {
                    email = it
                },
                label = "Электронная почта",
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Email,
                        contentDescription = "emailIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                isError = viewState.value == SignInViewState.Error,
                enabled = viewState.value != SignInViewState.Loading
            )
            Spacer(modifier = Modifier.padding(12.dp))
            FormTextField(
                value = password,
                visualTransformation = PasswordVisualTransformation(),
                onValueChange = {
                    password = it
                },
                label = "Пароль",
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Lock,
                        contentDescription = "emailIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                isError = viewState.value == SignInViewState.Error,
                enabled = viewState.value != SignInViewState.Loading
            )
            Spacer(modifier = Modifier.padding(12.dp))
            ClickableText(
                text = AnnotatedString("Регистрация"),
                onClick = {
                    signInViewModel.obtainEvent(SignInEvent.RedirectToSignUp)
                }
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
                modifier = Modifier.width(180.dp),
                enabled = viewState.value != SignInViewState.Loading
            ) {
                when (viewState.value) {
                    is SignInViewState.Loading -> CircularProgressIndicator(
                        color = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(18.dp),
                        strokeWidth = 2.dp
                    )
                    else -> Text(
                        text = "ВОЙТИ",
                        fontSize = 16.sp,
                        style = MaterialTheme.typography.labelLarge
                    )
                }

            }
        }
    }
    LaunchedEffect(key1 = viewState, block = {
        signInViewModel.obtainEvent(SignInEvent.EnterScreen)
    })

    DisposableEffect(key1 = viewState) {
        onDispose {
            signInViewModel.obtainEvent(SignInEvent.OutScreen)
        }
    }
}

@Composable
@Preview
fun SignInScreenPreview() {
    SignInScreen(signInViewModel = SignInViewModel(LocalContext.current))
}