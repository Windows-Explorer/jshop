<template>
    <div class="form">
        <span class="input-label">Username</span>
        <input v-model="user.username" type="text">

        <span class="input-label">Email</span>
        <input v-model="user.email" type="email">

        <span class="input-label">Password</span>
        <input v-model="user.password" type="password" minlength="8" maxlength="16">

        <span class="input-label">Confirm password</span>
        <input v-model="user.confirmPassword" type="password" minlength="8" maxlength="16">


        <span class="validation-error" v-for="(error, index) of validator.$errors" :key="index">
            <small>{{ error.$property.charAt(0).toUpperCase() + error.$property.slice(1) }}: </small>
            <small>{{ error.$message }}</small>
        </span>

        <button class="button-submit">Sign Up</button>
    </div>
</template>

<script setup lang="ts">

import { reactive } from "@vue/reactivity"
import { Store, useStore } from "vuex"
import { useVuelidate } from "@vuelidate/core"
import { required, email, helpers, minLength, maxLength } from "@vuelidate/validators"
import { isEmailUnique, isUsernameUnique } from "./validators-unique"
import { onUpdated } from "vue-demi"

const store = useStore()

const user = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
})

const confirmPassword = async (value: string) => {
    if(value === user.password) return true
} 

const validationRules = {
    username: {
        required: helpers.withAsync(required),
        minLength: helpers.withAsync(minLength(4)),
        maxLength: helpers.withAsync(maxLength(32)),
        isUnique: helpers.withMessage("Value is not unique", helpers.withAsync(isUsernameUnique))
    },
    email: {
        required: helpers.withAsync(required),
        email: helpers.withAsync(email),
        isUnique: helpers.withMessage("Value is not unique", helpers.withAsync(isEmailUnique))
        
    },
    password: {
        required: helpers.withAsync(required),
        minLength: helpers.withAsync(minLength(8)),
        maxLength: helpers.withAsync(maxLength(16))
    },
    confirmPassword: {
        required: helpers.withAsync(required),
        sameAsPassword: helpers.withMessage("Value is not equal to password", helpers.withAsync(confirmPassword))
    }
}


const validator = useVuelidate(validationRules, user, { $lazy: true })

onUpdated(() => {
    console.log(user)
})

validator.value.$validate()


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
    font-family: FuturaDemi;
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

.form .input-label {
    color: rgb(87, 87, 87);
    font-family: FuturaMedium;
}

</style>
