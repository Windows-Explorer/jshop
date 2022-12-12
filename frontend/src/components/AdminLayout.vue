<template>
    <section>
        <q-tabs :dense="false" :align="'left'">
            <h6>Admin layout</h6>
          <q-route-tab to="/products" label="Редактирование товаров" />
        </q-tabs>
    </section>
</template>

<style scoped>
h6 {
    font-size: medium;
    margin-block: 0px;
    margin-inline: 20px
}

</style>