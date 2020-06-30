import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: 'index.html',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  routes
})

export default router
