package com.jshop_android.interfaces

interface IProduct {
    val id: Long
    val title: String
    val description: String
    val image: String
    val cost: Long
    val type: String
}