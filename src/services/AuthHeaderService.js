import { useAuthStore } from '@/stores/AuthStore'

// NOT TESTED YET

export default function authHeader() {
  const authStore = useAuthStore()
  let user = authStore.getUser

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }
  } else {
    return {}
  }
}
