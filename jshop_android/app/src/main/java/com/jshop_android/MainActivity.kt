package com.jshop_android

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.jshop_android.components.BottomNavigationBar
import com.jshop_android.components.TopBar
import com.jshop_android.navigation.NavHost
import com.jshop_android.ui.theme.Jshop_androidTheme

class MainActivity : ComponentActivity() {
    @OptIn(ExperimentalMaterial3Api::class)
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val navController = rememberNavController()

            Jshop_androidTheme {
                MaterialTheme() {
                    Scaffold(
                        bottomBar = {
                            BottomNavigationBar(navController = navController)
                        },
                        topBar = {
                            TopBar()
                        }
                    ) { padding ->
                        Surface(modifier = Modifier.padding(padding)) {
                            NavHost(navController = navController)
                        }
                    }
                }
            }
        }
    }
}