<template>
    <FormKit ref="signInForm" type="form" :classes="{
        form: 'sign-up-form',
        input: 'form-submit'
    }" :actions="false" :config="{ validationVisibility: 'blur' }" @submit="onSubmit">
        <FormKit type="email" v-model="user.email" label="Электронная почта" validation="required" :validation-messages="{
                required: 'Обязательное поле'
            }" :classes="inputClasses" :prefix-icon="emailIcon" />
        <FormKit type="password" v-model="user.password" label="Пароль" validation="*required" :validation-messages="{
                required: 'Обязательное поле'
            }" :classes="inputClasses" :prefix-icon="passwordIcon" />
        <NuxtLink :to="{ path: '/signup' }" class="redirect-a">
            <span>Зарегистрироваться</span>
        </NuxtLink>
        <VButton label="Войти" style="background-color: #181818; box-shadow: none;" :size="16" />
    </FormKit>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue"
import { IUserSignIn, IUserSignUp } from "../../common/interfaces/user.interface"
import { Validator } from "../../common/validator/validator"
import useAuthStore from "../../store/auth.store"

const emailIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>'
const passwordIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>'

const inputClasses = {
    input: 'form-input',
    inner: 'form-inner',
    prefixIcon: 'form-prefix-icon',
    wrapper: 'form-wrapper',
    label: 'form-label',
    outer: 'form-outer',
    messages: 'form-messages',
}

const validator = new Validator()
const authStore = useAuthStore()

const user: Ref<IUserSignIn> = ref({
    email: "",
    password: ""
})
const confirmPassword: Ref<string> = ref("")
const signInForm: Ref<any> = ref(null)

async function onSubmit() {
    await authStore.signIn(user.value)
}

</script>

<style lang="scss">
.sign-up-form {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
    gap: 16px;
    align-items: center;
    padding-block: 30px;
}

.form-main-label {
    font-size: x-large;
    width: 100%;
    text-align: center;
    font-family: 'Roboto Slab', serif;
    margin: 20px;
}

.form-input {
    background-color: $secondary;
    border: 0px solid;
    border-radius: 4px;
    font-size: smaller;
    padding: 10px;
    outline: none;
    width: 100%;
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
    width: 100%;
    gap: 8px;
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
    font-size: smaller;
}

.form-messages {
    color: $error;
    font-size: smaller;
    font-family: "Nunito", serif;
    padding: 0px;
    list-style-type: none;
}

.form-outer {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

@media screen and (max-width: 760px) {
    .form-outer {
        width: 300px;
    }
}
</style>