package com.jshop_android

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.lifecycle.lifecycleScope
import com.jshop_android.screens.SplashScreen
import com.jshop_android.ui.theme.Jshop_androidTheme
import kotlinx.coroutines.delay

class SplashActivity : ComponentActivity() {
    @OptIn(ExperimentalMaterial3Api::class)
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycleScope.launchWhenCreated {
            delay(5000)

            val intent = Intent(this@SplashActivity, MainActivity::class.java)
            startActivity(intent)
            finish()
        }
        setContent {
            Jshop_androidTheme() {
                MaterialTheme() {
                    SplashScreen()
                }
            }
        }
    }
}