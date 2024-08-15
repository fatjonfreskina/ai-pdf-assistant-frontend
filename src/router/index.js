import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView
    },

    {
      path: '/home',
      name: 'home',
      component: HomeView
    },

    { path: '/:pathMatch(.*)*', redirect: '/welcome' }
  ]
})

router.beforeEach((to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/welcome']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  if (authRequired && !authStore.user) {
    console.log('Redirect to welcome')
    return {
      path: '/welcome',
      query: { returnUrl: to.path }
    }
  }
})

export default router
