import Vue from 'vue'
import App from './App.vue'
import '@popperjs/core'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
