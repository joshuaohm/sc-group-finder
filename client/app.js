import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import uuid from './mixins/UUID'

sync(store, router)

Vue.mixin(uuid);

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
