import VueCompositionApi from '@vue/composition-api'
import PortalVue from 'portal-vue'
import '@/assets/css/tailwind.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { useSupercharge } from '@/composables'

Vue.use(PortalVue)
Vue.use(VueCompositionApi)
useSupercharge()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
