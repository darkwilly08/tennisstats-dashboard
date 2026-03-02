import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/kit-bag',
      name: 'kit-bag',
      component: () => import('../pages/KitBag.vue')
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../pages/Analytics.vue')
    },
    {
      path: '/tournament',
      name: 'tournament',
      component: () => import('../pages/Tournament.vue')
    },
    {
      path: '/scouting',
      name: 'scouting',
      component: () => import('../pages/Scouting.vue')
    }
  ]
})

export default router