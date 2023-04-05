<template>
    <div class="home-page-container">
        <section class="image-section">
            <div class="section-content">
                <VLogo />
                <span class="logo-text">Welcome to</span>
                <span class="logo-subtext">Beans Coffee Production</span>
                <VButton label="Купить cum" :size="16" />
            </div>
        </section>
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
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 26px;
}

.logo-text {
    font-size: xx-large;
    font-family: 'Roboto Slab', serif;
    color: $primary;
    text-align: center;
    animation: 1.2s drawLogo ease;
}
.logo-subtext {
    font-size: xxx-large;
    font-family: 'Roboto Slab', serif;
    color: $primary;
    text-align: center;
    animation: 1.4s drawLogo ease;
}
</style>