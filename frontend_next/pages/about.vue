<template>
    <div class="about-page-wrapper">
        <Breadcrumb pageTitle="О нас" />
        <WelcomeMessage class="pt-100 pb-95" />
        <FunFact />
        <BrandLogoCarousel />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: "About Us"
            }
        }
    };
</script>
