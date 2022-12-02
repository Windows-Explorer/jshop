<template>
    <q-form @submit="onSubmit()" class="form">
        <h2>sign in</h2>
        <q-input
            v-model="user.email"
            label="Email"
            :filled="true"
            :type="'email'"
            :rules="validationRules.email"
            :no-error-icon="true"
        />
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

        <q-btn label="Sign In" type="submit" color="primary" style="align-self: center" :size="'18px'" />
    </q-form>
</template>

<script setup lang="ts">

import { reactive, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import { rules } from "../validation"
import { withMessage } from "../validation/helpers"
import { ref } from "vue"
import { useRouter } from "vue-router"


const store = useStore()
const quasar = useQuasar()
const router = useRouter()

const user = reactive({ username: "", email: "", password: "", confirmPassword: "" })

const validationRules = {
    email: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
        async (value: string) => await withMessage("Email is invalid", rules.isEmail(value))
    ],
    password: [
        async (value: string) => await withMessage("Field is required", rules.isRequired(value)),
    ]
}


const onSubmit = async () => {
    quasar.loading.show()
    
    await store.dispatch("signIn", user)

    quasar.loading.hide()
    router.push({ name: "home"})
    
}


</script>
