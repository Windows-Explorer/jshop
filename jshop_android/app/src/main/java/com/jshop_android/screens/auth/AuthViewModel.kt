package com.jshop_android.screens.auth.views

import androidx.lifecycle.ViewModel
import com.jshop_android.common.interfaces.IEventHandler
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class AuthViewModel: ViewModel(), IEventHandler<AuthEvent> {

}