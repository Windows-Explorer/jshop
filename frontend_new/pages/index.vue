<template>
    <div class="home-page-content">
        

        <div class="text-banner-container">
            <div class="text-banner">
                <h3 class="sub-header text-banner-content">
                    DON'T MISS TODAY'S FEATURED DEALS
                </h3>
                <h1 class="header text-banner-content">
                    Life Begin After Coffee
                </h1>
                <h4 class="content text-banner-content">
                    Here to bring your Life Style to the next level!
                </h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.text-banner-content {
    margin: 20px;
}
.home-page-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.text-banner-container {
    font-family: Arial, Helvetica, sans-serif;
    color: $primary;
    position: absolute;
    margin-left: 40%;
}
.text-banner {
    opacity: 0.95;
    .content{
        opacity: 0.8;
    }    
}

</style>