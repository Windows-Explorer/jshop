<template>
    <q-header v-if="(route.name !=='signup' && route.name !=='signin')" class="header">
        <div class="main-header">
            <div class="header-block">
                <q-btn label="Иркутская область" icon="location_on" size="12px" flat square />
            </div>
            <div class="header-block">
                <q-btn label="Войти" icon="login" :to="{ name: 'signin'}" size="12px" flat square />
            </div>
        </div>
        <div class="secondary-header">
            <img src="https://hobbygames.ru/assets/img/svg/logo.svg" />
            <q-form class="search" @submit="onSearch()">
                <q-input v-model="search" :style="{ width: '100%' }" filled>
                    <template v-slot:append>
                        <q-icon name="search" flat round />
                    </template>
                </q-input>
            </q-form>
            <q-btn icon="shopping_cart" size="20px" flat round color="primary" />
        </div>

    </q-header>
</template>

<script lang="ts" setup>

import { defineAsyncComponent, ref, Ref } from "@vue/runtime-core"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"

const AdminLayout = defineAsyncComponent(async () => import("../components/admin/AdminLayout.vue"))

const store = useStore()
const router = useRouter()
const route = useRoute()

const search: Ref<string> = ref("")

const onSearch = async () => {
    alert(search.value)
}

const onLogout = async () => {
  await store.dispatch('signOut', router)
}

</script>