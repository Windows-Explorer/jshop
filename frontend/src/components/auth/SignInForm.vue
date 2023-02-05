<template>
    <q-form @submit="onSubmit()" @reset="onReset()" class="form">
        <h4>Вход</h4>
        <q-input
            v-model="user.email"
            label="Электронная почта"
            :type="'email'"
            no-error-icon
            flat
        />
        <q-input
            v-model="user.password"
            label="Пароль"
            :type="'password'"
            :maxlength="16"
            :counter="true"
            no-error-icon
            flat
        />
        <div class="redirect-container">
            <router-link class="redirect" :to="{ name: 'signup' }">Регистрация</router-link>
            <span class="redirect" @click="quasar.dialog({ message:'Вспоминайте', title:'Забыли пароль?' })">Забыли пароль?</span>
        </div>
        <span class="buttons">
            <q-btn label="Войти" type="submit" :size="'18px'" color="positive" :loading="loading" />
        </span>
    </q-form>
</template>

<script setup lang="ts">

import { reactive, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { Validator } from "../../common/validation/validator"
import { ValidatorHelper } from "../../common/validation/validator-helper"
import { ref } from "vue"

const store = useStore()
const quasar = useQuasar()
const router = useRouter()

const validator: Validator = new Validator()
const validatorHelper: ValidatorHelper = new ValidatorHelper()

const loading: Ref<boolean> = ref(false)
const user = reactive({ username: "", email: "", password: "", confirmPassword: "" })


const onSubmit = async () => {
    loading.value = true
    await store.dispatch("signIn", { user: user, router: router })
    loading.value = false
}
const onReset = async () => router.push({ name: "home" })

</script>

<style lang="scss" scoped>
.redirect {
    color: $secondary
}
</style>