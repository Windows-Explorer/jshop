<template>
    <v-form ref="form" lazy-validation>
        <v-text-field v-model="user.username" :counter="10" :rules="nameRules" label="First name" />
    </v-form>
</template>

<script setup lang="ts">

import { reactive } from "vue"
import { useStore } from "vuex"

const store = useStore()

const user = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
})

const nameRules = [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ]

</script>