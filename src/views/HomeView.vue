<script setup>
// import NavBar from '../components/NavBar.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import { useAuthStore } from '../stores/AuthStore'
import AiApiService from '../services/AiApiService'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const assistants = ref([])

onMounted(() => {
  loadAssistants()
})

async function loadAssistants() {
  try {
    let result = await AiApiService.getAllAssistants()
    assistants.value = result
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <SidebarComponent :user="authStore.user" :assistants="assistants" />
</template>
