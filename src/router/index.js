import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import GuestLayout from '../layouts/GuestLayout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

import DashboardLayout from '../layouts/DashboardLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import Reports from '../views/Reports.vue'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    /*
    beforeEnter(to, from, next) {
      console.log(to)
      // check auth
      if (store.state.isAuthenticated) {
        if (to.meta.roles.includes(store.state.user.type)) {
          next()
        } else {
          console.log('User is not authorized for route.')
        }
      } else {
        next('/login')
      }
    }, */

    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          roles: ['Admin', 'Standard']
        }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
          roles: ['Admin', 'Standard']
        }
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports,
        meta: {
          roles: ['Admin']
        }
      }
    ]
  }
]
/*
const routes = [
  {
    path: '/',
    component: GuestLayout,
    chidren: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports
      }
    ]
  }
]
*/

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && store.state.isAuthenticated) {
    if (to.meta?.roles?.includes(store.state.user.type)) {
      next()
    } else {
      console.log('User is not authorized for route.')
    }
  } else if (to.meta?.requiresAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
