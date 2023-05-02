<template>
    <FormKit type="form" :classes="{ form: 'sign-up-form' }">
        <h2 class="form-main-label">Регистрация</h2>
        <FormKit type="text" v-model="user.username" label="Имя пользователя"
            validation="required|matches:/^@[a-zA-Z]+$/|length:5" :classes="inputClasses" :prefix-icon="userIcon" />
        <FormKit type="email" v-model="user.email" label="Электронная почта"
            validation="required|matches:/^@[a-zA-Z]+$/|email" :classes="inputClasses" :prefix-icon="emailIcon" />
        <FormKit type="password" v-model="user.password" label="Пароль" validation="required" :classes="{
            input: 'form-input',
            inner: 'form-inner',
            prefixIcon: 'form-prefix-icon',
            wrapper: 'form-wrapper',
            label: 'form-label'
        }" :prefix-icon="passwordIcon" />
        <FormKit type="password" v-model="user.password" label="Подтвердите пароль" validation="required"
            :classes="inputClasses" :prefix-icon="passwordIcon" />
    </FormKit>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue"
import { IUserSignUp } from "~~/common/interfaces/user.interface"

const userIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>'
const emailIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>'
const passwordIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>'

const inputClasses = {
    input: 'form-input',
    inner: 'form-inner',
    prefixIcon: 'form-prefix-icon',
    wrapper: 'form-wrapper',
    label: 'form-label',
    outer: 'form-outer',
    messages: 'form-messages'
}

const user: Ref<IUserSignUp> = ref({
    email: "",
    username: "",
    phoneNumber: "",
    password: ""
})
const confirmPassword: Ref<string> = ref("")

</script>

<style lang="scss">
.sign-up-form {
    background-color: $primary;
    padding: 10px 40px;
    border-radius: 10px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 20px;
    align-items: center;
}

.form-main-label {
    font-size: xx-large;
    width: 100%;
    text-align: center;
    font-family: 'Roboto Slab', serif;
}

.form-input {
    background-color: $secondary;
    border: 0px solid;
    border-radius: 4px;
    width: 300px;
    font-size: large;
    padding: 10px;
    outline: none;
    transition: 0.5s ease, box-shadow 0.5s cubic-bezier(0.25, 0.1, 0.31, 1.61);
    color: $dark;
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0);
}


.form-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transition: 0.5s ease;
    gap: 10px;
}

.form-prefix-icon {
    svg {
        fill: $dark;
    }
}

.form-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.form-label {
    font-family: 'Roboto Slab', serif;
    color: $accent;
}
</style>