import { defineStore } from 'pinia'
import { ref } from 'vue'

// TODO: add the token to the store

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const jwt = ref(JSON.parse(localStorage.getItem('jwt')))

  function updateUser(newUser) {
    localStorage.setItem('user', JSON.stringify(newUser))
    this.user = newUser
  }

  function updateToken(newToken) {
    localStorage.setItem('jwt', JSON.stringify(newToken))
    this.jwt = newToken
  }

  function getUser() {
    return user.value
  }

  function getToken() {
    return jwt.value
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
    this.user = null
    this.jwt = null
  }

  return { user, updateUser, getUser, logout, jwt, updateToken, getToken }
})
