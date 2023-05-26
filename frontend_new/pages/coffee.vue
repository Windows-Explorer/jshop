<template>
    <div class="coffee-page-container">
        <VCoffeeSection />
    </div>
</template>

<style lang="scss" scoped>
.home-page-container {
    height: 100vh;
    width: 100vw;
}
.image-section {
    background: url("../assets/images/background.jpg");
    background-size: cover;
    height: 100%;
    width: 100%;
}
.section-content {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}
.logo-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
.logo {
    margin-top: 8%;
    width: 150px;
    height: 150px;
    background: url("../assets/images/logo-light.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
}
</style>