package com.jshop_android.activities.splashActivity

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.lifecycle.lifecycleScope
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.jshop_android.activities.authActivities.signInActivity.SignInActivity
import com.jshop_android.activities.mainActivity.MainActivity
import com.jshop_android.activities.mainActivity.screens.SplashScreen
import com.jshop_android.store.UserStore
import com.jshop_android.ui.theme.Jshop_androidTheme
import kotlinx.coroutines.flow.first

@SuppressLint("CustomSplashScreen")
class SplashActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleScope.launchWhenCreated {
            val userStore = UserStore(this@SplashActivity)
            val token = userStore.getToken.first()
            userStore.verifyToken()
            if (token != "") {
                val intent = Intent(this@SplashActivity, MainActivity::class.java)
                startActivity(intent)
            } else {
                val intent = Intent(this@SplashActivity, SignInActivity::class.java)
                startActivity(intent)
            }
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