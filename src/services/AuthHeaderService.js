import { useAuthStore } from '../stores/AuthStore'

export default function authHeader() {
  const authStore = useAuthStore()
  const token = authStore.getToken()

  if (token) {
    return { 
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  } else {
    return {}
  }
}
