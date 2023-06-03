package com.jshop_android.activities.authActivities.signInActivity

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.jshop_android.activities.authActivities.signInActivity.screens.signIn.SignInScreen
import com.jshop_android.activities.authActivities.signInActivity.screens.signIn.SignInViewModel
import com.jshop_android.ui.theme.Jshop_androidTheme

class SignInActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val signInViewModel = SignInViewModel(this)


        setContent {
            Jshop_androidTheme {
                MaterialTheme() {
                    SignInScreen(signInViewModel)
                }
            }
        }
    }
}