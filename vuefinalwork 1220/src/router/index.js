import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'
import Products from '@/pages/Products'
import Hokkaido from '@/pages/Hokkaido'
import Osaka from '@/pages/Osaka'
import Tokyo from '@/pages/Tokyo'
import CustomerOrder from '@/pages/CustomerOrder'
import Admin from '@/pages/Admin'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'/',
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
    {
      path: '/hokkaido',
      name: 'hokkaido',
      component: Hokkaido,
    },
    {
      path: '/osaka',
      name: 'osaka',
      component: Osaka,
    },
    {
      path: '/tokyo',
      name: 'tokyo',
      component: Tokyo,
    },
    {
      path: '/customerorder',
      name: 'customerorder',
      component: CustomerOrder,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      
    },
  ]
})
