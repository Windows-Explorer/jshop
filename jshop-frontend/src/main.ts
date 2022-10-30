import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

export const store = createStore({
    state() {
      return { title: "LLL" }
    }
})

const app = createApp(App)


app.use(store)

app.mount("#app")
