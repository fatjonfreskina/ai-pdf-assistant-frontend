<script setup>
import UserApiService from '../services/UserApiService.js'
import { useAuthStore } from '../stores/AuthStore'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // For navigation after successful login

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref(false)
const errorText = ref('')
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.user) {
    // TODO: check if the token is still valid
    router.push('/home')
  }
})

async function onLoginPressed() {
  try {
    let result = await UserApiService.login(username.value, password.value)
    if (result.message) {
      router.push('/home')
    }
  } catch (e) {
    errorText.value = e.message
    showError()
  }
}

async function showError() {
  error.value = true
  setTimeout(() => {
    error.value = false
  }, 3000)
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4">Welcome back</h2>
      <img src="/logo.png" alt="Logo" class="login-logo" />
      <form @submit.prevent="login">
        <div class="mb-2">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
            placeholder="Enter your username"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary btn-lg mt-3" @click="onLoginPressed">
            Login
          </button>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ errorText }}
          </div>
          <button
            type="button"
            class="btn btn-outline-secondary mt-2"
            @click="router.push('/password-forgot')"
          >
            Forgot Password?
          </button>
        </div>
        <div class="text-center mt-3">
          <button type="button" class="btn btn-link" @click="router.push('/register')">
            Don't have an account? Register here
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-logo {
  width: 150px; /* Adjust the size as needed */
  margin-bottom: 20px; /* Adjust the spacing as needed */
  align-self: center;
}

.card {
  border-radius: 10px;
}

h2 {
  font-weight: bold;
}

.btn-primary {
  border: none;
}
</style>
