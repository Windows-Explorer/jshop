<template>
    <div class="auth-header">
        <div class="header-block">
            <q-btn label="Нефтекамск" icon="location_on" size="12px" flat square />
            <q-btn label="Помощь" size="12px" flat square :to="{ name: 'personaldatapolicy' }" />
        </div>
        <div class="header-block">
            <q-btn
                v-if="!store.getters.isAuthorized"
                label="Войти"
                icon="login"
                @click="onSignIn()"
                size="12px"
                flat
                square
            >
                <q-dialog transition-show="jump-down" transition-hide="jump-up" v-model="signInShowing">
                    <div>
                        <sign-in-form @sign-up="onSignUp()" />
                    </div>
                </q-dialog>
                <q-dialog transition-show="jump-down" transition-hide="jump-up" v-model="signUpShowing">
                    <div>
                        <sign-up-form @sign-in="onSignIn()" />
                    </div>
                </q-dialog>
            </q-btn>
            <q-btn
                v-if="store.getters.isAuthorized"
                label="Учетная запись"
                icon="person"
                size="12px"
                flat
                square
            >
                <q-menu fit anchor="bottom left" self="top left">
                    <q-item clickable @click="onLogout()">
                        <q-item-section>Выйти</q-item-section>
                    </q-item>
                </q-menu>
            </q-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, Ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const AdminLayout = defineAsyncComponent(async () => import("../components/admin/AdminLayout.vue"))
const SignInForm = defineAsyncComponent(async () => import("../components/auth/SignInForm.vue"))
const SignUpForm = defineAsyncComponent(async () => import("../components/auth/SignUpForm.vue"))

const store = useStore()
const router = useRouter()

const signInShowing: Ref<boolean> = ref(false)
const signUpShowing: Ref<boolean> = ref(false)

const onSignIn = async () => {
    signUpShowing.value = false
    signInShowing.value = true
}
const onSignUp = async () => {
    signUpShowing.value = true
    signInShowing.value = false
}

const onLogout = async () => {
  await store.dispatch('signOut', router)
}
</script>