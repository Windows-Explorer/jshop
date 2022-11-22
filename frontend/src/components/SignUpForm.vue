<template>
    <div class="form">
        <span>Username</span>
        <input v-model="username" type="login">
        <span>Email</span>
        <input v-model="email" type="email">
        <span>Password</span>
        <input v-model="password" type="password">
        <span>Confirm password</span>
        <input v-model="confirmPassword" type="password">
        <button class="button-submit">Sign Up</button>
    </div>
</template>

<script setup lang="ts">

import { ref, Ref } from "@vue/reactivity"
import { useStore } from "vuex"

const store = useStore()

const email: Ref<string> = ref("")
const username: Ref<string> = ref("")
const password: Ref<string> = ref("")
const confirmPassword: Ref<string> = ref("")

</script>

<style>

.form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 300px;
    padding-block: 30px;
    padding-inline: 20px;
    background-color: white;
}

.form input {
    font-family: FuturaBook;
    font-size: 20px;
    border: 0px solid black;
    border-radius: 4px;
    padding: 8px;
    height: 20px;
    margin-block: 6px;
    background-color: rgb(217, 219, 226);
    outline: none;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.29);
    transition:
        box-shadow 0.5s cubic-bezier(0.45, 0.79, 0, 2.05),
        height 0.5s cubic-bezier(0.62, -0.86, 0, 2.05),
        background-color 0.2s ease;
}

.form input:focus {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.29);
    height: 28px;
    background-color: white;
}

.form button {
    font-size: 22px;
    border: 0px solid black;
    border-radius: 4px;
    padding: 10px;
    margin-block: 6px;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.29);
    background-color: rgb(66 201 109);
    color: white;
    align-self: flex-start;
    cursor: pointer;
}

.form span {
    color: rgb(87, 87, 87);
    font-family: FuturaMedium;
}

</style>
