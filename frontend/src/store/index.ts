import { createLogger, createStore } from 'vuex'
// import users from "./modules/users"

export default createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // users
  }
})
