package com.jshop_android.activities.splashActivity

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.lifecycle.lifecycleScope
import com.jshop_android.activities.authActivity.AuthActivity
import com.jshop_android.activities.mainActivity.screens.SplashScreen
import com.jshop_android.ui.theme.Jshop_androidTheme

class SplashActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycleScope.launchWhenCreated {
            val intent = Intent(this@SplashActivity, AuthActivity::class.java)
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