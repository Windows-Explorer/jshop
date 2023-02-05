import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)


app.use(Quasar, quasarUserOptions)
app.use(store)
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
