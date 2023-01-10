<template>
    <q-form @submit="onSubmit()" @reset="onReset()" class="form">
        <logo/>
        <q-input
            v-model="user.username"
            label="Имя пользователя"
            :standout="quasar.dark.mode"
            :filled="!quasar.dark.mode"
            :type="'text'"
            :rules="validationRules.username"
            :maxlength="32"
            :counter="true"
            no-error-icon
        />
        <q-input
            v-model="user.email"
            label="Электронная почта"
            :standout="quasar.dark.mode"
            :filled="!quasar.dark.mode"
            :type="'email'"
            :rules="validationRules.email"
            no-error-icon
        />
        <q-input
            v-model="user.number"
            label="Номер телефона"
            :mask="'+7 (###) ###-##-##'"
            :standout="quasar.dark.mode"
            :filled="!quasar.dark.mode"
            :type="'tel'"
            :rules="validationRules.phoneNumber"
            :maxlength="18"
            no-error-icon
        />
        <q-input
            v-model="user.password"
            label="Пароль"
            :standout="quasar.dark.mode"
            :filled="!quasar.dark.mode"
            :type="'password'"
            :rules="validationRules.password"
            :maxlength="16"
            :counter="true"
            no-error-icon
        />
        <q-input
            v-model="user.confirmPassword"
            label="Подтверждение пароля"
            :standout="quasar.dark.mode"
            :filled="!quasar.dark.mode"
            :type="'password'"
            :rules="validationRules.confirmPassword"
            :maxlength="16"
            no-error-icon
        />
        
        <span class="buttons">
            <q-btn label="Назад" type="reset" :size="'18px'"/>
            <q-btn label="Регистрация" type="submit" :size="'18px'" />
        </span>

        <div class="redirect-container">
            <router-link class="redirect" :to="{name: 'signin'}">Уже есть аккаунт</router-link>
        </div>
        
        
    </q-form>
</template>

<script setup lang="ts">

import { reactive, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import { rules } from "../../validation"
import { withMessage } from "../../validation/helpers"
import { useRouter } from "vue-router"
import { defineAsyncComponent } from "@vue/runtime-core"

const logo = defineAsyncComponent(async () => import("../icons/LogoDarkIcon.vue"))

const store = useStore()
const router = useRouter()
const quasar = useQuasar()

const user = reactive({ username: "", email: "", phoneNumber: "", password: "", confirmPassword: "" })

const validationRules = {
    username: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
        async (value: string) => await withMessage("", rules.minLength(value, 4)),
        async (value: string) => await withMessage("", rules.isUsernameUnique(value))
    ],
    email: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
        async (value: string) => await withMessage("", rules.isEmail(value)),
        async (value: string) => await withMessage("", rules.isEmailUnique(value))
    ],
    password: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
        async (value: string) => await withMessage("", rules.minLength(value, 8)),
    ],
    confirmPassword: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
        async (value: string) => await withMessage("", rules.isEqual(value, user.password)),
    ],
    phoneNumber: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
        async (value: string) => await withMessage("", rules.isPhoneNumber(value)),
    ]
}


const onSubmit = async () => {
    quasar.loading.show()
    await store.dispatch("signUp", { user: user, router: router})
    quasar.loading.hide()
}

const onReset = async () => router.push({ name: "home" })


</script>
