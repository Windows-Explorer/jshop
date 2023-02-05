<template>
    <q-form @submit="onSubmit()" @reset="onReset()" class="form">
        <logo class="logo"/>
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
            v-model="user.password"
            label="Пароль"
            :standout="quasar.dark.mode"
            :filled="!quasar.dark.mode"
            :type="'password'"
            :rules="validationRules.password"
            :maxlength="16"
            :counter="true"
            no-error-icon />
        <span class="buttons">
            <q-btn label="Назад" type="reset" :size="'18px'"/>
            <q-btn label="Войти" type="submit" :size="'18px'" />
        </span>
        <div class="redirect-container">
            <router-link class="redirect" :to="{ name: 'signup' }">Зарегистрироваться</router-link>
            <span class="redirect" @click="quasar.dialog({ message:'Вспоминайте', title:'Забыли пароль?' })">Забыли пароль?</span>
        </div>
    </q-form>
</template>

<script setup lang="ts">

import { reactive, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { defineAsyncComponent } from "vue"
import { Validator } from "../../common/validation/validator"
import { ValidatorHelper } from "../../common/validation/validator-helper"

const store = useStore()
const quasar = useQuasar()
const router = useRouter()

const validator: Validator = new Validator()
const validatorHelper: ValidatorHelper = new ValidatorHelper()

const logo = defineAsyncComponent(async () => import("../icons/LogoDarkIcon.vue"))

const user = reactive({ username: "", email: "", password: "", confirmPassword: "" })

const validationRules = {
    email: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.isEmail(value))
    ],
    password: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
    ]
}


const onSubmit = async () => {
    await store.dispatch("signIn", { user: user, router: router })
}

const onReset = async () => router.push({ name: "home" })

</script>

<style lang="scss" scoped>
.redirect {
    color: $secondary
}
</style>