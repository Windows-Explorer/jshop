<template>
    <div class="form">
        <h2>sign up</h2>

        <span class="input-label">Username</span>
        <input v-model="user.username" type="text" @focus="validator.username.$validate()" ref="usernameRef">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.username.$errors.length > 0">
                {{ validator.username.$errors[0].$message }}
            </span>
        </transition>
        
        <span class="input-label">Email</span>
        <input v-model="user.email" type="email" @focus="validator.email.$validate()"  ref="emailRef">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.email.$errors.length > 0">
                {{ validator.email.$errors[0].$message }}
            </span>
        </transition>

        <span class="input-label">Password</span>
        <input v-model="user.password" type="password" minlength="8" maxlength="16" @focus="validator.password.$validate()" ref="passwordRef">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.password.$errors.length > 0">
                {{ validator.password.$errors[0].$message }}
            </span>
        </transition>

        <span class="input-label">Confirm password</span>
        <input v-model="user.confirmPassword" type="password" minlength="8" maxlength="16" @focus="validator.confirmPassword.$validate()" ref="confirmPasswordRef">
        <transition name="validation-error-transition">
            <span class="validation-error" v-if="validator.confirmPassword.$errors.length > 0">
                {{ validator.confirmPassword.$errors[0].$message }}
            </span>
        </transition>
        
        <button ref="buttonSubmitRef" @click="submit()" class="button-submit">Sign Up</button>
    </div>
</template>

<script setup lang="ts">

import { reactive, ref, Ref } from "@vue/reactivity"
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

const confirmPassword = async (value: string): Promise<Boolean> => {
    if(value === user.password) return true

    return false
} 

const validationRules = {
    username: {
        required: helpers.withMessage("Username should be not empty", helpers.withAsync(required)),
        minLength: helpers.withAsync(minLength(4)),
        maxLength: helpers.withAsync(maxLength(32)),
        isUnique: helpers.withMessage("Username is not unique", helpers.withAsync(isUsernameUnique))
    },
    email: {
        required: helpers.withMessage("Email should be not empty", helpers.withAsync(required)),
        email: helpers.withAsync(email),
        isUnique: helpers.withMessage("Email is not unique", helpers.withAsync(isEmailUnique))
        
    },
    password: {
        required: helpers.withMessage("Password should be not empty", helpers.withAsync(required)),
        minLength: helpers.withAsync(minLength(8)),
        maxLength: helpers.withAsync(maxLength(16))
    },
    confirmPassword: {
        required: helpers.withMessage("Please, confirm your password", helpers.withAsync(required)),
        sameAsPassword: helpers.withMessage("Value is not equal to password", helpers.withAsync(confirmPassword))
    }
}

const validator = useVuelidate(validationRules, user, { $lazy: true })

const submit = async () => {
    await validator.value.$validate()
}

const usernameRef = ref()
const emailRef = ref()
const passwordRef = ref()
const confirmPasswordRef = ref()

const validationPainting = async () => {
    if(await validator.value.username.$validate()) {
        usernameRef.value.classList = null
    }
    else{
        usernameRef.value.classList = "invalid"
    }
}

onUpdated(async () => {
    validationPainting()
})

</script>

<style>

.invalid {
    box-shadow: 0px 0px 0px 2px rgba(255, 0, 0, 0.6) !important;
}

.form h2 {
    font-family: FuturaDemi;
    font-size: 28px;
    margin-top: 0px;
    align-self: center;
    color: rgb(53, 53, 53);
    text-transform: uppercase;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 300px;
    height: 500px;
    padding-block: 30px;
    padding-inline: 20px;
    border-radius: 4px;
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
    align-self: flex-end;
    cursor: pointer;
    transition: 0.5s ease;
    user-select: none;
    height: 64px;
    animation-play-state: running;
    transition: 0.5s ease-in-out;
}

.form button:hover {
    cursor: pointer;
    background-color: rgb(49, 153, 82);
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

.validation-error-transition-enter-active {
    transition: 0.5s cubic-bezier(0.69, 0.26, 0.34, 1.76);
}
.validation-error-transition-leave-active {
    transition: 0.5s ease;
}
.validation-error-transition-enter-from, .validation-error-transition-leave-to {
    height: 0;
}

.validation-error-transition-enter-to, .validation-error-transition-leave-from {
    height: 20px;
}

</style>
