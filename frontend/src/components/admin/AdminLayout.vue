<template>
    <div class="auth-header">
        <div class="header-block">
            <q-btn :to="{ name: 'productsEdit' }" size="12px" label="Редактирование товаров" flat square />
            <q-btn :to="{ name: 'imageUpload' }" size="12px" label="Загрузка изображений" flat square />
        </div>
    </div>
</template>

<style scoped>

section {
    font-family: RobotoRegular;
}

</style>