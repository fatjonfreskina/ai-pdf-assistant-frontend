<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserApiService from '../services/UserApiService'

const router = useRouter()

const email = ref('')
const successfulEmail = ref(false)
const failedEmail = ref(false)
const errorText = ref('')

async function onForgotPasswordPressed() {
  try {
    const result = await UserApiService.passwordForgot(email.value)

    if (result) {
      showSuccessBanner()
      router.push('/login')
    }
  } catch (e) {
    showErrorBanner(e.message)
  }
}

async function showErrorBanner(message) {
  errorText.value = message
  failedEmail.value = true
  setTimeout(() => {
    failedEmail.value = false
  }, 3000)
}

async function showSuccessBanner() {
  successfulEmail.value = true
  setTimeout(() => {
    successfulEmail.value = false
  }, 3000)
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4">Insert your email</h2>
      <p class="text-center">You will receive an email with instructions to reset your password</p>
      <form @submit.prevent="onForgotPasswordPressed">
        <div class="mb-3">
          <label for="username" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100">Send reset email</button>
        </div>
        <div v-if="successfulEmail" class="alert alert-success" role="alert">
          Email sent successfully
        </div>
        <div v-if="errorText" class="alert alert-danger" role="alert">
          {{ errorText }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
