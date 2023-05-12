<template>
    <teleport to="body">
        <Transition name="dialog">
            <div class="v-dialog" v-if="showDialog">
                <h2>{{ props.dialogProps?.dialogTitle }}</h2>
            </div>
        </Transition>
    </teleport>
</template>

<script lang="ts" setup>
import { IDialogProps } from '~~/common/interfaces/props/dialog.props.interface'

interface IProps {
    dialogProps?: IDialogProps
}

const nuxtApp = useNuxtApp()
const props = defineProps<IProps>()

const showDialog: Ref<boolean> = ref(false)

onMounted(async () => {
    showDialog.value = true
})


</script>

<style scoped>
.v-dialog {
    position: fixed;
    z-index: 2000;
    width: 300px;
    height: 250px;
    background-color: white;
}

.dialog-enter-active,
.dialog-leave-active {
    transition: 0.5s;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
}
</style>