import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Detail from '../components/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router