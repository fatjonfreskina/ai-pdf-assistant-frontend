import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAssistantsStore = defineStore('assistants', () => {
  const assistants = ref(JSON.parse(localStorage.getItem('assistants')) || [])

  function updateAssistants(newAssistants) {
    localStorage.setItem('assistants', JSON.stringify(newAssistants))
    assistants.value = newAssistants
  }

  function getAssistantByName(name) {
    return assistants.value.find((assistant) => assistant.name === name)
  }

  function clearAssistants() {
    localStorage.removeItem('assistants')
    assistants.value = []
  }

  return { assistants, updateAssistants, getAssistantByName, clearAssistants }
})
