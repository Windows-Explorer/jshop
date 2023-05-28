<template>
    <div class="header-container">
        <div class="header-routes-block">
            <div class="header">
                <VRouteTabMobile :to="{ path: '/' }" label="главная"
                    style="animation: jump-down 0.6s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zm-6-2h5V9.157l-6-5.454-6 5.454V19h5v-6h2v6z" />
                        </svg>
                    </template>
                </VRouteTabMobile>
                <VRouteTabMobile :to="{ path: '/contact' }" label="контакты"
                    style="animation: jump-down 0.8s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" />
                        </svg>
                    </template>
                </VRouteTabMobile>
                <VRouteTabMobile :to="{ path: '/coffee' }" label="кофе"
                    style="animation: jump-down 1s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M16 13V5H6v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2zM5 3h15a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4a1 1 0 0 1 1-1zm13 2v3h2V5h-2zM2 19h18v2H2v-2z" />
                        </svg>
                    </template>
                </VRouteTabMobile>
                <VRouteTabMobile :to="{ path: '/cart' }" label="Корзина" v-if="isAuthorized"
                    style="animation: jump-down 1.2s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
                            </path>
                        </svg>
                    </template>
                </VRouteTabMobile>
                <VRouteTabMobile :to="{ path: '/signin' }" label="Аккаунт" v-if="!isAuthorized"
                    style="animation: jump-down 1.4s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                            </path>
                        </svg>
                    </template>
                </VRouteTabMobile>
                <VRouteTabMobile :to="{ path: '/account' }" label="Аккаунт" v-if="isAuthorized"
                    style="animation: jump-down 1.4s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                            </path>
                        </svg>
                    </template>
                </VRouteTabMobile>
            </div>
        </div>
        <div class="separator"></div>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from "vue"
import useAuthStore from "../store/auth.store"

const isAuthorized: Ref<boolean> = ref(false)
const store = useAuthStore()

onMounted(async () => {
    isAuthorized.value = await store.isAuthorized()
})

</script>


<style lang="scss" scoped>
.header-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    top: 0;
    flex-direction: column;
}

.header-routes-block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
}

.header {
    display: flex;
    padding: 10px 20px;
    background-color: transparent;
    border-radius: 0px 0px 20px 20px;
}

.separator {
    height: 2px;
    width: 90%;
    background-color: $primary;
    animation: 1s drawSeparator ease;
}
</style>