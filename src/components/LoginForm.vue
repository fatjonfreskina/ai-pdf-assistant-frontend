<script setup>
import UserApiService from '@/services/UserApiService.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // For navigation after successful login
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')

onMounted(() => {})

async function login() {
  await UserApiService.login(username.value, password.value);
  if (authStore.user){
    router.push('/home'); // Redirect to dashboard after successful login
  } 
}
</script>

<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
