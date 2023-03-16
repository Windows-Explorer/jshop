<template>
    <div class="header-container">
        <div class="header">
            <VRouteTab :to="{ path: '/' }" label="главная" style="animation: jump-down 0.6s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zm-6-2h5V9.157l-6-5.454-6 5.454V19h5v-6h2v6z" />
                    </svg>
                </template>
            </VRouteTab>
            <VRouteTab :to="{ path: '/contact' }" label="контакты" style="animation: jump-down 0.8s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" />
                    </svg>
                </template>
            </VRouteTab>
            <VRouteTab :to="{ path: '/tea' }" label="чай" style="animation: jump-down 1s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path
                            d="M21 3v2c0 9.627-5.373 14-12 14H5.243C5.08 19.912 5 20.907 5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0zm-8 2c-4.418 0-8 3.582-8 8 0 .362.003.711.01 1.046 1.254-1.978 3.091-3.541 5.494-4.914l.992 1.736C8.641 12.5 6.747 14.354 5.776 17H9c6.015 0 9.871-3.973 9.997-11.612-1.372.133-2.647.048-4.22-.188C13.627 5.027 13.401 5 13 5z" />
                    </svg>
                </template>
            </VRouteTab>
            <VRouteTab :to="{ path: '/coffee' }" label="кофе" style="animation: jump-down 1.2s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M16 13V5H6v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2zM5 3h15a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4a1 1 0 0 1 1-1zm13 2v3h2V5h-2zM2 19h18v2H2v-2z" />
                    </svg>
                </template>
            </VRouteTab>
            <VRouteTab :to="{ path: '/about' }" label="о нас" style="animation: jump-down 1.4s 1 cubic-bezier(0.6, 0.1, 0, 1.5);">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path
                            d="M12 2c5.523 0 10 4.477 10 10 0 4.4-2.841 8.136-6.789 9.473l-.226.074-2.904-7.55C13.15 13.95 14 13.054 14 12c0-1.105-.895-2-2-2s-2 .895-2 2c0 1.077.851 1.955 1.917 1.998l-2.903 7.549-.225-.074C4.84 20.136 2 16.4 2 12 2 6.477 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8 0 2.92 1.564 5.475 3.901 6.872l1.48-3.849C8.534 14.29 8 13.207 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.207-.535 2.29-1.38 3.023.565 1.474 1.059 2.757 1.479 3.85C18.435 17.475 20 14.92 20 12c0-4.418-3.582-8-8-8z" />
                    </svg>
                </template>
            </VRouteTab>
        </div>
        <div class="header">
            <VPopover />
            <VPopover />
            <VPopover />
            <VPopover />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.header-container {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;

    .header {
        display: flex;
        padding: 40px 40px;
        background-color: transparent;
        border-radius: 0px 0px 20px 20px;
    }

}</style>