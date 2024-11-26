import authHeader from '../services/AuthHeaderService'
import.meta.env.VITE_API_URL_DEV;
import.meta.env.VITE_API_URL_PROD;

const API_AI_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_DEV + 'ai/'
    : import.meta.env.VITE_API_URL_PROD + 'ai/';

class AiApiService {
  async getAllAssistants() {
    const response = await fetch(API_AI_URL + 'assistants', {
      method: 'GET',
      headers: authHeader()
    }).catch((error) => {
      console.error('Error fetching assistants: ', error)
    })

    if (!response) {
      throw new Error('Failed to fetch assistants')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      return jsonResponse.assistants
    }

    throw new Error(response.message)
  }

  // Fetch a single assistant by ID
  async getAssistantByName(assistantName) {
    const response = await fetch(`${API_AI_URL}${assistantName}`, {
      method: 'GET',
      headers: authHeader()
    }).catch((error) => {
      console.error(`Error fetching assistant with ID ${assistantName}:`, error)
    })

    if (!response) {
      throw new Error('Failed to fetch assistant')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      return jsonResponse.data
    }
    throw new Error(jsonResponse.message)
  }

  async askQuestion(assistantName, question) {
    const response = await fetch(`${API_AI_URL}ask`, {
      method: 'POST',
      body: JSON.stringify({
        assistant_name: assistantName,
        question: question
      }),
      headers: authHeader()
    }).catch((error) => {
      console.error(`Error asking question to assistant ${assistantName}:`, error)
    })

    if (!response) {
      throw new Error('Failed to ask question')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      // jsonResponse.citations to get the citations
      return jsonResponse
    }

    throw new Error(jsonResponse.message)
  }
}

export default new AiApiService()
