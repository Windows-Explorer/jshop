<template>
    <div class="about-image-block">
        <div class="about-image-block-container">
            <VLogo />
            <h2>Наша история</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    margin: 20px;
    font-family: 'Roboto Slab', serif;
    font-size: xxx-large;
    color: $primary;
}

.about-image-block {
    width: 100%;
    height: 60vh;
    background: url("../../assets/images/background-about_1.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.about-image-block-container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
}
@media screen and (max-width: 600px) {
    h2 {
        font-size: xx-large;
    }
}
</style>