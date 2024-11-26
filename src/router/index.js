import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },

    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },

    {
      path: '/password-forgot',
      name: 'password-forgot',
      component: () => import('../views/PasswordForgotView.vue')
    },

    {
      path: '/password_reset/:token',
      name: 'password_reset',
      component: () => import('../views/PasswordResetView.vue'),
      props: true // Automatically passes route parameters (like token) as props
    },

    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ]
})

router.beforeEach((to) => {
  const publicPages = ['/login', '/register', '/password-forgot', '/password_reset']

  // Extract the base path without the token
  const basePath = to.path.split('/')[1] // This gets 'password_reset' from '/password_reset/TOKEN'

  const authRequired = !publicPages.includes(`/${basePath}`)
  const authStore = useAuthStore()

  if (authRequired && !authStore.user) {
    console.log('Redirecting to login, authRequired:', authRequired, 'user:', authStore.user)
    return {
      path: '/login',
      query: { returnUrl: to.fullPath }
    }
  }
})

export default router
