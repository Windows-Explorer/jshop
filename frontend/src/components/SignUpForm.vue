<template>
    <q-form @submit="onSubmit()" class="form" ref="signUpForm">
        <h2>sign up</h2>
        <q-input
            v-model="user.username"
            label="Username"
            :filled="true"
            :type="'text'"
            :rules="validationRules.username"
            :maxlength="32"
            :counter="true"
            :no-error-icon="true"
        />
        <q-input
            v-model="user.email"
            label="Email"
            :filled="true"
            :type="'email'"
            :rules="validationRules.email"
            :no-error-icon="true"
        />
        <q-input
            v-model="user.number"
            label="Phone"
            :filled="true"
            :type="'tel'"
            :rules="validationRules.phoneNumber"
            :maxlength="11"
            :no-error-icon="true"
        />
        {{ user.number}}
        <q-input
            v-model="user.password"
            label="Password"
            :filled="true"
            :type="'password'"
            :rules="validationRules.password"
            :maxlength="16"
            :counter="true"
            :no-error-icon="true"
        />
        <q-input
            v-model="user.confirmPassword"
            label="Confirm password"
            :filled="true"
            :type="'password'"
            :rules="validationRules.confirmPassword"
            :maxlength="16"
            :no-error-icon="true"
        />

        <q-btn label="Sign Up" type="submit" color="primary" style="align-self: center" :size="'18px'" />
    </q-form>
</template>

<script setup lang="ts">

import { reactive, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import { rules } from "../validation"
import { withMessage } from "../validation/helpers"
import { ref } from "vue"


const store = useStore()
const quasar = useQuasar()

const user = reactive({ username: "", email: "", number: "", password: "", confirmPassword: "" })

const validationRules = {
    username: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
        async (value: string) => await withMessage("Username is too short", rules.minLength(value, 4)),
        async (value: string) => await withMessage("Username is not unique", rules.isUsernameUnique(value))
    ],
    email: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
        async (value: string) => await withMessage("Email is invalid", rules.isEmail(value)),
        async (value: string) => await withMessage("Email is not unique", rules.isEmailUnique(value))
    ],
    password: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
        async (value: string) => await withMessage("Password it too short", rules.minLength(value, 8)),
    ],
    confirmPassword: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
        async (value: string) => await withMessage("It's not equal, fuck you", rules.isEqual(value, user.password)),
    ],
    phoneNumber: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
        async (value: string) => await withMessage("Phone number is invalid", rules.isPhoneNumber(value)),
    ]
}

const signUpForm: Ref = ref(null)

const onSubmit = async () => {
    quasar.loading.show()
    const result = await fetch("http://localhost:3000/auth/signup", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
    quasar.loading.hide()
    quasar.dialog({
        title: result.status+"",
        message: await result.text(),
    })

    user.password = ""
    user.confirmPassword = ""
    user.email = ""
    user.username = ""
}


</script>

<style scoped>

.form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 300px;
    padding-block: 30px;
    padding-inline: 20px;
    border-radius: 4px;
    background-color: white;
    transition: 0.5s ease;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    gap: 14px;
}

.form h2 {
    font-family: FuturaDemi;
    font-size: 28px;
    margin-top: 0px;
    align-self: center;
    color: rgb(53, 53, 53);
    text-transform: uppercase;
    user-select: none;
}

</style>
