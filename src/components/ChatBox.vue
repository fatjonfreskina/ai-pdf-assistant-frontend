<script setup>
import { ref } from 'vue'
import { marked } from 'marked';
import AiApiService from '@/services/AiApiService'

const props = defineProps(['assistant'])
const messages = ref([])
const newMessage = ref('')
const loadingResponse = ref(false)

function clearChat() {
  messages.value = []
}

async function sendMessage() {
  if (props.assistant === '') {
    alert('Please select an assistant first.')
    return
  }

  if (newMessage.value.trim() === '') {
    alert('Please enter a message.')
    return
  }

  if (newMessage.value.trim() !== '') {
    // Add user message
    messages.value.unshift({
      text: newMessage.value,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    })

    // Clear the input field
    try{
      loadingResponse.value = true
      const messageToSend = newMessage.value;
      newMessage.value = ''
      const result = await AiApiService.askQuestion(props.assistant, messageToSend)
      loadingResponse.value = false
      // result.citations contains the citations
      messages.value.unshift({
        text: marked(result.response),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString()
      })
    } catch (e) {
      console.error('Error:', e)
    }
  }
}
</script>

<template>
  <div class="container-fluid chat-container">
    <div class="card chatbox-card">
      <div class="card-header">
        <h2>Chat with {{ props.assistant }} assistant</h2>
      </div>
      <div class="card-body chat-box">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div :class="['message-content', message.sender]">
            <span v-if="message.sender === 'user'">{{ message.text }}</span>
            <span v-else v-html="message.text"></span>
            <small class="text-muted">{{ message.timestamp }}</small>
          </div>
        </div>
      </div>
      <!-- Show loading message or spinner when loadingResponse is true -->
      <div v-if="loadingResponse" class="loading-indicator">
          <span>Loading response...</span>
          <!-- You could also replace the text with a spinner icon or image here -->
        </div>
      <div class="card-footer">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Type a message..."
            v-model="newMessage"
            @keyup.enter="sendMessage"
          />
          <button class="btn btn-primary ms-2" @click="sendMessage">Send</button>
          <button class="btn btn-secondary ms-2" @click="clearChat">Clear Chat</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh; /* Full height to cover the viewport */
}

.chatbox-card {
  width: 100%; /* Adjust the width as needed */
  max-height: 90vh; /* Adjust the max height to fit within the viewport */
  border-radius: 15px; /* Rounded corners */
  display: flex;
  flex-direction: column;
}

.card {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allow the card to grow to fill the space */
}

.chat-box {
  flex-grow: 1; /* Take up available space */
  max-height: 85vh; /* Adjust the max height to fit within the viewport */
  overflow-y: auto; /* Make it scrollable */
  display: flex;
  flex-direction: column-reverse; /* Reverse the order of messages */
}

.chat-box::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}
.chat-box {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.message {
  margin-bottom: 8px;
}

.message-content {
  padding: 10px;
  border-radius: 5px;
}

.message-content.user {
  background-color: #007bff;
  color: white;
  text-align: right;
}

.message-content.assistant {
  background-color: #f1f1f1;
  color: black;
  text-align: left;
}

.card-header {
  font-weight: bold;
  border-top-left-radius: 15px; /* Rounded corners for header */
  border-top-right-radius: 15px; /* Rounded corners for header */
}

.card-footer {
  position: sticky;
}
</style>
