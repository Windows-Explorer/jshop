<template>
    <q-header v-if="(route.name !=='signup' && route.name !=='signin')" class="header">
        <div class="header-content">
            <admin-layout v-if="store.getters.role === 'admin'" />
            <q-tabs :dense="false" :align="'left'">
                <q-route-tab :to="{ name: 'products' }" label="Продукты" icon="shopping_bag" />
                <q-route-tab :to="{ name: 'cart' }" label="Корзина" icon="shopping_cart"/>
            </q-tabs>
            
            <q-tabs>
                <q-route-tab
                    v-if="!store.getters.isAuthorized"
                    :to="{ name: 'signin' }"
                    label="Войти"
                    flat
                    icon="login"
                />
                <q-route-tab label="Учетная запись" icon="account_circle" v-if="store.getters.isAuthorized">
                    <q-menu fit :transition-show="'jump-down'" :transition-hide="'jump-up'">
                        <div class="menu">
                            <q-btn
                                v-if="store.getters.isAuthorized"
                                label="Выйти"
                                v-close-popup
                                @click="onLogout()"
                                flat
                                icon="logout"
                            />
                        </div>
                    </q-menu>
                </q-route-tab>
            </q-tabs>
        </div>
    </q-header>
</template>

<script lang="ts" setup>

import { useQuasar } from "quasar"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"


const store = useStore()
const router = useRouter()
const quasar = useQuasar()
const route = useRoute()

const onLogout = async () => {
  quasar.loading.show()
  await store.dispatch('signOut', router)
  quasar.loading.hide()
}

</script>