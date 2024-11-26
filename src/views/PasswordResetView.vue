<script setup>
import UserApiService from '../services/UserApiService'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const token = route.params.token

const newPassword = ref('')
const confirmNewPassword = ref('')

const successfulReset = ref(false)
const failedReset = ref(false)
const errorText = ref('')

async function showErrorBanner(message) {
  errorText.value = message
  failedReset.value = true
  setTimeout(() => {
    failedReset.value = false
  }, 3000)
}

async function showSuccessBanner() {
  successfulReset.value = true
  setTimeout(() => {
    successfulReset.value = false
  }, 5000)
}

function passwordMatch() {
  return newPassword.value === confirmNewPassword.value
}

function isPasswordValid() {
  return (
    newPassword.value.length >= 8 &&
    /[A-Z]/.test(newPassword.value) &&
    /[0-9]/.test(newPassword.value)
  )
}

async function resetPassword() {
  if (!passwordMatch()) {
    showErrorBanner('Passwords do not match')
    return
  }

  if (!isPasswordValid()) {
    showErrorBanner(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
    )
    return
  }

  try {
    const result = await UserApiService.passwordReset(token, newPassword.value)
    if (result) {
      showSuccessBanner()
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  } catch (e) {
    showErrorBanner(e.message)
  }
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4">Change your password</h2>
      <p class="text-center">Enter your new password</p>
      <form @submit.prevent="resetPassword">
        <div class="mb-3">
          <label for="newPassword" class="form-label">New password</label>
          <input
            type="password"
            class="form-control"
            id="username"
            v-model="newPassword"
            placeholder="New password"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Confirm new password</label>
          <input
            type="password"
            class="form-control"
            id="email"
            v-model="confirmNewPassword"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100" @click="onRegisterPressed">
            Reset password
          </button>
        </div>
        <div v-if="successfulReset" class="alert alert-success" role="alert">
          Password reset successful. Redirecting to login page.
        </div>
        <div v-if="failedReset" class="alert alert-danger" role="alert">
          {{ errorText }}
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
