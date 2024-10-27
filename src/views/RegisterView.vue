<script setup>
import UserApiService from '../services/UserApiService.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const sudoPassword = ref('')

const successfulRegistration = ref(false)
const failedRegistration = ref(false)
const errorText = ref('')

onMounted(() => {})

async function onRegisterPressed() {
  if (password.value !== confirmPassword.value) {
    showErrorBanner('Passwords do not match')
    return
  }

  try {
    const result = await UserApiService.register(
      username.value,
      email.value,
      password.value,
      sudoPassword.value
    )
    if (result.message) {
      showSuccessBanner()
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  } catch (e) {
    showErrorBanner(e.message)
  }
}

async function showErrorBanner(message) {
  errorText.value = message
  failedRegistration.value = true
  setTimeout(() => {
    failedRegistration.value = false
  }, 3000)
}

async function showSuccessBanner() {
  successfulRegistration.value = true
  setTimeout(() => {
    successfulRegistration.value = false
  }, 3000)
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4">Create an Account</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
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
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            placeholder="Enter your email"
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
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <div class="mb-3">
          <label for="sudoPassword" class="form-label">Super user token</label>
          <input
            type="password"
            class="form-control"
            id="sudoPassword"
            v-model="sudoPassword"
            placeholder="Enter the super user token"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Contact Fatjon Freskina for the super user token"
          />
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary btn-lg" @click="onRegisterPressed">
            Register
          </button>
        </div>
        <div v-if="failedRegistration" class="alert alert-danger" role="alert">
          {{ errorText }}
        </div>
        <div v-if="successfulRegistration" class="alert alert-success" role="alert">
          Registration successful. You will be redirected to the login page.
        </div>
        <div class="text-center mt-3">
          <button type="button" class="btn btn-link" @click="router.push('/login')">
            Already have an account? Login here
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
