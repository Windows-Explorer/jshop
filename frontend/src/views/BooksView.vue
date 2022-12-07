<template>
    <section>
        <game-card :game="book" v-for="(book, index) in books" :key="index"/>
        <h5 v-if="(books.length === 0)">Пусто</h5>
    </section>
</template>

<script setup lang="ts">
import { IBook } from "../store/modules/books/book.interface"
import { Ref, ref } from "@vue/reactivity"
import { defineAsyncComponent, onMounted } from "@vue/runtime-core"
import { useStore } from "vuex"

const store = useStore()

const GameCard = defineAsyncComponent(async () => import("../components/GameCard.vue"))

const books: Ref<IBook[]> = ref<IBook[]>([])

const getBooks = async () => {
    books.value = await store.dispatch("getBooks")
}

onMounted(async () => getBooks())

</script>

<style scoped>
    section {
        width: 100%;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        align-items: flex-start;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>