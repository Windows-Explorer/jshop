<template>
    <section>
        <span>Only authed page</span>
    </section>
    
</template>


<script setup lang="ts">

import { onMounted } from '@vue/runtime-core'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const quasar = useQuasar()
const store = useStore()



</script>
