
import VContactImage from './VContactImage.vue';

<template>
    <section class="contact-section">
        <VContactImageBlock />
        <VContactSendBlock />
    </section>
</template>

<style lang="scss" scoped>

.contact-section {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
}

@media screen and (max-width: 700px) {
    .contact-section {
        height: auto;
        flex-direction: column;
    }
}

</style>