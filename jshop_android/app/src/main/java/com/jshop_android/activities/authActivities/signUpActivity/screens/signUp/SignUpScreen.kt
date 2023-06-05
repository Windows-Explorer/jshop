package com.jshop_android.activities.authActivities.signUpActivity.screens.signUp

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.ClickableText
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Phone
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
import com.jshop_android.common.Validator
import com.jshop_android.common.classes.UserSignUp
import com.jshop_android.components.BeansLogo
import com.jshop_android.components.FormTextField

@Composable
fun SignUpScreen(signUpViewModel: SignUpViewModel) {
    val viewState = signUpViewModel.signUpViewState.observeAsState()

    var username by remember { mutableStateOf(TextFieldValue("")) }
    var email by remember { mutableStateOf(TextFieldValue("")) }
    var password by remember { mutableStateOf(TextFieldValue("")) }
    var phoneNumber by remember { mutableStateOf(TextFieldValue("")) }

    var usernameIsValid by remember { mutableStateOf(true) }
    var emailIsValid by remember { mutableStateOf(true) }
    var phoneNumberIsValid by remember { mutableStateOf(true) }
    var passwordIsValid by remember { mutableStateOf(true) }

    when (val state = viewState.value) {
        is SignUpViewState.Error -> {
            usernameIsValid = state.usernameIsValid
            emailIsValid = state.emailIsValid
            phoneNumberIsValid = state.phoneNumberIsValid
            passwordIsValid = state.passwordIsValid
        }
        else -> {}
    }

    Surface(
        modifier = Modifier.fillMaxSize()
    ) {
        val systemUiController = rememberSystemUiController()
        systemUiController.setStatusBarColor(
            color = MaterialTheme.colorScheme.secondary, darkIcons = !isSystemInDarkTheme()
        )
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
                value = username,
                onValueChange = {
                    if (Validator.maxLength(it.text, 32)) {
                        username = it
                    }
                },
                label = "Имя пользователя",
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.AccountBox, contentDescription = "accountIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Text),
                isError = !usernameIsValid,
                enabled = viewState.value != SignUpViewState.Loading
            )
            Spacer(modifier = Modifier.padding(12.dp))
            FormTextField(
                value = email,
                onValueChange = {
                    email = it
                },
                label = "Электронная почта",
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Email, contentDescription = "emailIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                isError = !emailIsValid,
                enabled = viewState.value != SignUpViewState.Loading
            )
            Spacer(modifier = Modifier.padding(12.dp))
            FormTextField(
                value = phoneNumber,
                onValueChange = {
                    phoneNumber = it
                },
                label = "Номер телефона",
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Phone, contentDescription = "phoneIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                isError = !phoneNumberIsValid,
                enabled = viewState.value != SignUpViewState.Loading
            )
            Spacer(modifier = Modifier.padding(12.dp))
            FormTextField(
                value = password,
                visualTransformation = PasswordVisualTransformation(),
                onValueChange = {
                    if (Validator.maxLength(it.text, 16)) {
                        password = it
                    }
                },
                label = "Пароль",
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Lock, contentDescription = "lockIcon"
                    )
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                isError = !passwordIsValid,
                enabled = viewState.value != SignUpViewState.Loading
            )
            Spacer(modifier = Modifier.padding(12.dp))
            ClickableText(text = AnnotatedString("Уже есть аккаунт"), onClick = {
                signUpViewModel.obtainEvent(SignUpEvent.RedirectToSignIn)
            })
            Spacer(modifier = Modifier.padding(12.dp))
            Button(
                onClick = {
                    signUpViewModel.obtainEvent(
                        SignUpEvent.SignUp(
                            UserSignUp(
                                email = email.text,
                                username = username.text,
                                password = password.text,
                                phoneNumber = phoneNumber.text
                            )
                        )
                    )
                },
                modifier = Modifier.width(200.dp),
                enabled = viewState.value != SignUpViewState.Loading
            ) {
                when (viewState.value) {
                    is SignUpViewState.Loading -> CircularProgressIndicator(
                        color = MaterialTheme.colorScheme.secondary,
                        modifier = Modifier.size(18.dp),
                        strokeWidth = 2.dp
                    )
                    else -> Text(
                        text = "РЕГИСТРАЦИЯ",
                        fontSize = 18.sp,
                        style = MaterialTheme.typography.labelLarge
                    )
                }

            }
        }
    }
    LaunchedEffect(key1 = viewState, block = {
        signUpViewModel.obtainEvent(SignUpEvent.EnterScreen)
    })

    DisposableEffect(key1 = viewState) {
        onDispose {
            signUpViewModel.obtainEvent(SignUpEvent.OutScreen)
        }
    }
}

@Preview
@Composable
fun SignUpScreenPreview() {
    SignUpScreen(signUpViewModel = SignUpViewModel(LocalContext.current))
}