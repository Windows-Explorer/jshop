<template>
    <div class="v-logo">
        <CoffeeBeansIcon class="coffee-beans-icon" />
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
    animation: 0.5s drawBeans cubic-bezier(0.55,-0.16, 0.42, 2.15);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 6px;
    color: $primary;
    user-select: none;
}

.v-logo-label {
    font-family: 'Roboto Slab', serif;
    font-size: 30px;
    text-transform: uppercase;
    text-align: center;
    animation: 0.65s drawBeansText ease;
    overflow: hidden;
}

.v-logo-text {
    font-family: 'Nunito', serif;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
    animation: 0.75s drawBeansText ease;
    overflow: hidden;
}

.v-logo-footer {
    font-family: 'Nunito', serif;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
    animation: 0.85s drawBeansText ease;
    overflow: hidden;
}
.coffee-beans-icon {
    margin: 0px;
    height: 32px;
    fill: $primary;
    animation: 1s drawBeansIcon cubic-bezier(0.51,-0.15, 0.48, 1.6);
    overflow: hidden;
}
</style>