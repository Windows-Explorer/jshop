<template>
    <section class="photo-section">
        <VPhotoBlock image="images/ad-image_1.jpg" :sizes="{ height: '400px' }" />
        <VPhotoBlock image="images/ad-image_2.jpg" :sizes="{ height: '400px' }" />
        <div class="cum"><span>ржавая вода</span></div>
    </section>
</template>

<style lang="scss" scoped>
.photo-section {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.cum {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;

    span {
        font-family: 'Roboto Slab', serif;
        font-size: xxx-large;
        color: $primary;
        text-shadow: 0px 0px 10px black;
    }
}

@media screen and (max-width: 700px) {
    .photo-section {
        flex-direction: column;
    }
}
</style>