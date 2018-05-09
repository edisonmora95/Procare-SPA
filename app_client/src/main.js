// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import money from 'v-money'

import App from './App'
import router from './router'
import { store } from './store'
import NavBar from './components/Shared/Navbar.vue'

Vue.use(Vuetify)
Vue.use(money, {precision: 2})

Vue.config.productionTip = false

Vue.component('navbar', NavBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
