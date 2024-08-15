import axios from 'axios'
import { useAuthStore } from '@/stores/AuthStore'
import authHeader from './AuthHeaderService'

const API_AUTH_URL = 'http://localhost:8000/auth/'

class UserApiService {
  async fetchUser() {
    const res = await axios.get(API_AUTH_URL + 'user', {
      headers: authHeader()
    })

    if (res.ok) {
      const jsonResponse = await res.json()
      const user = jsonResponse.user
      const authStore = useAuthStore()
      authStore.updateUser(user)
    }

    throw new Error('Failed to fetch user')
  }

  async login(username, password) {
    const response = await fetch(API_AUTH_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }).catch((error) => {
      console.error('There was an error!', error)
    })

    if (response.ok) {
      const jsonResponse = await response.json()
      const user = jsonResponse.user
      const authStore = useAuthStore()
      authStore.updateUser(user)
      return
    }

    //throw new Error('Login failed')
  }

  async register(email, password) {
    const res = await fetch(API_AUTH_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const response = await res.json()
      return response.message
    }

    throw new Error('Failed to register')
  }
}

export default new UserApiService()
