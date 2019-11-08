import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import EventBus from "./util/EventBus"

Vue.config.productionTip = false

// 将 bus 挂载到原型上
Vue.prototype.$bus=new EventBus()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
