<template>
    <div class="form">
        <span class="input-label">Username</span>
        <input v-model="user.username" type="text">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.username.$errors.length > 0">
                {{ validator.username.$errors[0].$message }}
            </span>
        </transition>
        
        <span class="input-label">Email</span>
        <input v-model="user.email" type="email">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.email.$errors.length > 0">
                {{ validator.email.$errors[0].$message }}
            </span>
        </transition>

        <span class="input-label">Password</span>
        <input v-model="user.password" type="password" minlength="8" maxlength="16">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.password.$errors.length > 0">
                {{ validator.password.$errors[0].$message }}
            </span>
        </transition>

        <span class="input-label">Confirm password</span>
        <input v-model="user.confirmPassword" type="password" minlength="8" maxlength="16">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.confirmPassword.$errors.length > 0">
                {{ validator.confirmPassword.$errors[0].$message }}
            </span>
        </transition>

        <button class="button-submit">Sign Up</button>
    </div>
</template>

<script setup lang="ts">

import { reactive } from "@vue/reactivity"
import { useStore } from "vuex"
import { useVuelidate } from "@vuelidate/core"
import { required, email, helpers, minLength, maxLength } from "@vuelidate/validators"
import { isEmailUnique, isUsernameUnique } from "./validations"
import { onUpdated } from "vue-demi"

const store = useStore()

const user = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
})

const confirmPassword = async (value: string, equalTo: string): Promise<Boolean> => {
    if(value === user.password) return true

    return false
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

validator.value.$validate()


</script>

<style>

.form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 300px;
    height: 500px;
    padding-block: 30px;
    padding-inline: 20px;
    background-color: white;
    transition: 0.5s ease;
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
    transition: 0.5s ease;
}

.form .input-label {
    color: rgb(87, 87, 87);
    font-family: FuturaMedium;
}

.validation-error {
    font-family: FuturaMedium;
    font-size: 16px;
    color: rgb(228, 41, 34);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: hidden;
    height: 20px;
}

.validation-error-transition-enter-active, .validation-error-transition-leave-active {
  transition: 0.5s cubic-bezier(0.69, 0.26, 0.34, 1.76);
}
.validation-error-transition-enter-from, .validation-error-transition-leave-to {
    height: 0;
}

.validation-error-transition-enter-to, .validation-error-transition-leave-from {
    height: 20px;
}

</style>
