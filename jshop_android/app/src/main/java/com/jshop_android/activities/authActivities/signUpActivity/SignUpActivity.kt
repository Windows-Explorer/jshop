package com.jshop_android.activities.authActivities.signUpActivity

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import com.jshop_android.activities.authActivities.signUpActivity.screens.signUp.SignUpScreen
import com.jshop_android.activities.authActivities.signUpActivity.screens.signUp.SignUpViewModel
import com.jshop_android.ui.theme.Jshop_androidTheme

class SignUpActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val signUpViewModel = SignUpViewModel(this)


        setContent {
            Jshop_androidTheme {
                MaterialTheme() {
                    SignUpScreen(signUpViewModel)
                }
            }
        }
    }
}