import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../components/main/MainPage')
  },
  {
    path: '/one',
    name: 'oneHelloWorld',
    component: () => import('../components/HelloWorld')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/forms/LoginForm')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history' // убирает /#/ ванчале ссылки
})

export default router
