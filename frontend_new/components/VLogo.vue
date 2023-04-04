<template>
    <div class="v-logo">
        <span class="v-logo-label">Beans</span>
        <span class="v-logo-text">Coffee production</span>
        <span class="v-logo-footer">EST. 2003</span>
    </div>
</template>

<style lang="scss" scoped>
.v-logo {
    width: 150px;
    height: 150px;
    margin-top: 16vh;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 2px $primary, 0px 0px 0px 1px $primary inset;
    border: 6px solid transparent;
    background-repeat: no-repeat;
    background-size: contain;
    animation: 1s drawLogo ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    color: $primary;
    user-select: none;
}

.v-logo-label {
    font-family: 'Roboto Slab', serif;
    font-size: 30px;
    text-transform: uppercase;
    text-align: center;
}

.v-logo-text {
    font-family: 'Nunito', serif;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
}

.v-logo-footer {
    font-family: 'Nunito', serif;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
}
</style>