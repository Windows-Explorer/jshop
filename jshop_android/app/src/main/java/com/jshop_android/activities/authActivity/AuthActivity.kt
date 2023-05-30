package com.jshop_android.activities.authActivity

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import com.jshop_android.activities.authActivity.screens.signIn.SignInScreen
import com.jshop_android.ui.theme.Jshop_androidTheme

class AuthActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Jshop_androidTheme {
                MaterialTheme() {
                    SignInScreen()
                }
            }
        }
    }
}