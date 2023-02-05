<template>
    <q-form @submit="onSubmit()" @reset="onReset()" class="form">
        <h4>Регистрация</h4>
        <q-input
            v-model="user.username"
            label="Имя пользователя"
            :type="'text'"
            :rules="validationRules.username"
            :maxlength="32"
            :counter="true"
            no-error-icon
        />
        <q-input
            v-model="user.email"
            label="Электронная почта"
            :type="'email'"
            :rules="validationRules.email"
            no-error-icon
        />
        <q-input
            v-model="user.phoneNumber"
            label="Номер телефона"
            :mask="'+7 (###) ###-##-##'"
            :type="'tel'"
            :rules="validationRules.phoneNumber"
            :maxlength="18"
            no-error-icon
        />
        <q-input
            v-model="user.password"
            label="Пароль"
            :type="'password'"
            :rules="validationRules.password"
            :maxlength="16"
            :counter="true"
            no-error-icon
        />
        <q-input
            v-model="user.confirmPassword"
            label="Подтверждение пароля"
            :type="'password'"
            :rules="validationRules.confirmPassword"
            :maxlength="16"
            no-error-icon
        />

        <div class="redirect-container">
            <router-link class="redirect" :to="{ name: 'signin' }">Уже есть аккаунт</router-link>
        </div>
        <span class="buttons">
            <q-btn label="Регистрация" type="submit" :size="'18px'" :loading="loading" />
        </span>
    </q-form>
</template>

<script setup lang="ts">

import { reactive, ref, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { Validator } from "../../common/validation/validator"
import { ValidatorHelper } from "../../common/validation/validator-helper"

const store = useStore()
const router = useRouter()

const validator: Validator = new Validator()
const validatorHelper: ValidatorHelper = new ValidatorHelper()

const user = reactive({ username: "", email: "", phoneNumber: "", password: "", confirmPassword: "" })
const loading: Ref<boolean> = ref(false)

const validationRules = {
    username: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.minLength(value, 4)),
        async (value: string) => await validatorHelper.withMessage("", await validator.isUsernameUnique(value))
    ],
    email: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.isEmail(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.isEmailUnique(value))
    ],
    password: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.minLength(value, 8)),
    ],
    confirmPassword: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.isEqual(value, user.password)),
    ],
    phoneNumber: [
        async (value: string) => await validatorHelper.withMessage("", await validator.isRequired(value)),
        async (value: string) => await validatorHelper.withMessage("", await validator.isPhoneNumber(value)),
    ]
}


const onSubmit = async () => {
    loading.value = true
    await store.dispatch("signUp", { user: user, router: router })
    loading.value = false
}

const onReset = async () => router.push({ name: "home" })


</script>

<style lang="scss" scoped>
.redirect {
    color: $secondary
}
</style>