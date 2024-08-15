import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))

  function updateUser(newUser) {
    localStorage.setItem('user', JSON.stringify(newUser))
    this.user = newUser
  }

  function getUser() {
    return user.value
  }

  function logout() {
    localStorage.removeItem('user')
    this.user = null
  }

  return { user, updateUser, getUser, logout }
})
