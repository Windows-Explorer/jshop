<template>
    <transition name="sticky-header">
        <div class="sticky-header-container" v-if="show">
            <div class="sticky-header">
                <VRouteTab :to="{ path: '/' }" label="главная"
                    style="animation: jump-down 0.6s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zm-6-2h5V9.157l-6-5.454-6 5.454V19h5v-6h2v6z" />
                        </svg>
                    </template>
                </VRouteTab>
                <VRouteTab :to="{ path: '/contact' }" label="контакты"
                    style="animation: jump-down 0.8s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" />
                        </svg>
                    </template>
                </VRouteTab>
                <VRouteTab :to="{ path: '/tea' }" label="чай"
                    style="animation: jump-down 1s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path
                                d="M21 3v2c0 9.627-5.373 14-12 14H5.243C5.08 19.912 5 20.907 5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0zm-8 2c-4.418 0-8 3.582-8 8 0 .362.003.711.01 1.046 1.254-1.978 3.091-3.541 5.494-4.914l.992 1.736C8.641 12.5 6.747 14.354 5.776 17H9c6.015 0 9.871-3.973 9.997-11.612-1.372.133-2.647.048-4.22-.188C13.627 5.027 13.401 5 13 5z" />
                        </svg>
                    </template>
                </VRouteTab>
                <VRouteTab :to="{ path: '/coffee' }" label="кофе"
                    style="animation: jump-down 1.2s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M16 13V5H6v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2zM5 3h15a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4a1 1 0 0 1 1-1zm13 2v3h2V5h-2zM2 19h18v2H2v-2z" />
                        </svg>
                    </template>
                </VRouteTab>
                <VRouteTab :to="{ path: '/about' }" label="о нас"
                    style="animation: jump-down 1.4s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path
                                d="M12 2c5.523 0 10 4.477 10 10 0 4.4-2.841 8.136-6.789 9.473l-.226.074-2.904-7.55C13.15 13.95 14 13.054 14 12c0-1.105-.895-2-2-2s-2 .895-2 2c0 1.077.851 1.955 1.917 1.998l-2.903 7.549-.225-.074C4.84 20.136 2 16.4 2 12 2 6.477 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8 0 2.92 1.564 5.475 3.901 6.872l1.48-3.849C8.534 14.29 8 13.207 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.207-.535 2.29-1.38 3.023.565 1.474 1.059 2.757 1.479 3.85C18.435 17.475 20 14.92 20 12c0-4.418-3.582-8-8-8z" />
                        </svg>
                    </template>
                </VRouteTab>
                <VRouteTab :to="{ path: '/cart' }" label="Корзина"
                    style="animation: jump-down 1.6s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
                            </path>
                        </svg>
                    </template>
                </VRouteTab>
                <VRouteTab :to="{ path: '/cart' }" label="Учетная запись"
                    style="animation: jump-down 1.8s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z">
                            </path>
                        </svg>
                    </template>
                </VRouteTab>
            </div>
            <div class="separator"></div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from "vue"

const show: Ref<boolean> = ref(false)

onMounted(async () => {
    window.addEventListener("scroll", async (event: Event) => {
        if (window.scrollY > 60) {
            show.value = true
        }
        else {
            show.value = false
        }
    })
})

</script>

<style lang="scss" scoped>
.separator {
    width: 100%;
    animation: 1s drawSeparatorFull ease;
}

.sticky-header-container {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 2;
    background-color: rgba($dark, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.sticky-header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sticky-header-enter-active,
.sticky-header-leave-active {
    transition: 0.3s ease;
}

.sticky-header-enter-from,
.sticky-header-leave-to {
    transform: translateY(-100%);
    box-shadow: 0px 0px 0px black;
}

.sticky-header-enter-to,
.sticky-header-leave-from {
    transform: translateY(0);
    box-shadow: 0px 0px 20px black;
}
</style>