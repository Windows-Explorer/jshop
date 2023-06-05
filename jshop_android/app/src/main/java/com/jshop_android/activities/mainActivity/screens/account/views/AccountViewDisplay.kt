package com.jshop_android.activities.mainActivity.screens.account.views

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.jshop_android.activities.mainActivity.screens.account.AccountEvent
import com.jshop_android.activities.mainActivity.screens.account.AccountViewModel
import com.jshop_android.activities.mainActivity.screens.account.AccountViewState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccountViewDisplay(accountViewModel: AccountViewModel, state: AccountViewState.Display) {
    val showDialog = remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Button(
            onClick = {
                showDialog.value = true
            },
        ) {
            Text(text = "Выйти")
        }
        if (showDialog.value) AlertDialog(onDismissRequest = {
            showDialog.value = false
        }) {
            Card(
                modifier = Modifier
                    .width(120.dp)
                    .height(160.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Выйти?",
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 24.sp
                    )
                    Spacer(modifier = Modifier.padding(12.dp))
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Button(onClick = {
                            accountViewModel.obtainEvent(AccountEvent.SignOut)
                        }) {
                            Text(
                                text = "Да",
                                fontSize = 16.sp,
                                style = MaterialTheme.typography.displayMedium
                            )
                        }
                        Spacer(modifier = Modifier.padding(6.dp))
                        Button(onClick = {
                            showDialog.value = false
                        }) {
                            Text(
                                text = "Нет",
                                fontSize = 16.sp,
                                style = MaterialTheme.typography.displayMedium
                            )
                        }
                    }
                }
            }
        }
    }
}