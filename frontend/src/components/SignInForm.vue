<template>
    <q-form @submit="onSubmit()" @reset="onReset()" class="form">
        <logo/>
        <q-input
            v-model="user.email"
            label="Электронная почта"
            standout
            :dark="true"
            :type="'email'"
            :rules="validationRules.email"
            no-error-icon
        />
        <q-input
            v-model="user.password"
            label="Пароль"
            standout
            :dark="true"
            :type="'password'"
            :rules="validationRules.password"
            :maxlength="16"
            :counter="true"
            no-error-icon
        />
        <span class="buttons">
            <q-btn label="Назад" type="reset" dark color="primary" :size="'18px'"/>
            <q-btn label="Войти" type="submit" dark color="primary" :size="'18px'" />
        </span>

        <div class="redirects">
            <router-link class="redirect" :to="{name: 'signup'}">Зарегистрироваться</router-link>
            <span class="redirect" @click="quasar.dialog({message:'Вспоминайте', title:'Забыли пароль?'})">Забыли пароль?</span>
        </div>
        
    </q-form>
</template>

<script setup lang="ts">

import { reactive, Ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import { rules } from "../validation"
import { withMessage } from "../validation/helpers"
import { useRouter } from "vue-router"
import { defineAsyncComponent } from "vue"


const store = useStore()
const quasar = useQuasar()
const router = useRouter()

const logo = defineAsyncComponent(async () => import("./icons/LogoDarkIcon.vue"))

const user = reactive({ username: "", email: "", password: "", confirmPassword: "" })

const validationRules = {
    email: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
        async (value: string) => await withMessage("", rules.isEmail(value))
    ],
    password: [
        async (value: string) => await withMessage("", rules.isRequired(value)),
    ]
}


const onSubmit = async () => {
    quasar.loading.show()
    
    await store.dispatch("signIn", { user: user, router: router })

    quasar.loading.hide()
    
}

const onReset = async () => {
    
    // router.push({ name: "home"})
    window.location.href = "https://www.youtube.com/watch?v=DJsn1QivbKM"
}


</script>

<style scoped>
.redirects {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
}
.redirect {
    cursor: pointer;
    text-decoration: none;
    color: white;
}

</style>