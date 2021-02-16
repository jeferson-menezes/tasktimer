import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './shared/filters/date-filter'
import './plugins/confirm-dialog'

Vue.config.productionTip = false

window._Vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
