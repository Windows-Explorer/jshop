<template>
    <section>
        <md-editor
            ref="editorRef"
            v-model="editor"
            :footers="[]"
            :language="'en-US'"
            :theme="'dark'"
            :code-theme="'atom'"
            :on-save="renderHTML"
        />
        <div v-html="resultHTML" />
    </section>
</template>

<script lang="ts" setup>

import { ref, Ref } from '@vue/reactivity'
import MdEditor, { SaveEvent } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const editor: Ref<any> = ref("")
const resultHTML: Ref<string> = ref("")

const renderHTML: SaveEvent = async (value: string, html: Promise<string>) => {
    resultHTML.value = await html
}


</script>