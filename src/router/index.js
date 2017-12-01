import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Huren from '@/components/Huren'
import Verhuren from '@/components/Verhuren'
import Locaties from '@/components/Locaties'
import Tankstations from '@/components/Tankstations'
import Account from '@/components/Account'
import Login from '@/components/Login'
import Registreer from '@/components/Registreer'
import Mijnautos from '@/components/Mijnautos'
import Gehuurdeautos from '@/components/Gehuurdeautos'
import Detail from '@/components/Detail'
import NotFound from '@/components/NotFound'
import Disclaimer from '@/components/Disclaimer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Huren',
      name: 'Huren',
      component: Huren
    },
    {
      path: '/Verhuren',
      name: 'Verhuren',
      component: Verhuren
    },
    {
      path: '/Locaties',
      name: 'Locaties',
      component: Locaties
    },
    {
      path: '/Tankstations',
      name: 'Tankstations',
      component: Tankstations
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/Account/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Account/Registreer',
      name: 'Registreer',
      component: Registreer
    },
    {
      path: '/Account/Mijnautos',
      name: 'Mijnautos',
      component: Mijnautos
    },
    {
      path: '/Account/Gehuurdeautos',
      name: 'Gehuurdeautos',
      component: Gehuurdeautos
    },
    {
      path: '/Huren/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Disclaimer',
      name: 'Disclaimer',
      component: Disclaimer
    },
    {
      path: '/*',
      name: 'Notfound',
      component: NotFound
    }
  ]
})
