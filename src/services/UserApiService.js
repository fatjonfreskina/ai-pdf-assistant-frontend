import { useAuthStore } from '../stores/AuthStore'

const API_AUTH_URL =
  import.meta.env.MODE === 'development'
    ? `http://localhost:8000/user/`
    : `https://fatjonfreskina.westeurope.cloudapp.azure.com/assistant/user/`

class UserApiService {
  async login(username, password) {
    const response = await fetch(API_AUTH_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).catch((error) => {
      console.error('There was an error during the login', error)
    })

    if (!response) {
      throw new Error('Login failed.')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      const authStore = useAuthStore()
      authStore.updateUser(jsonResponse.user)
      authStore.updateToken(jsonResponse.tokens.access_token)
      return jsonResponse
    }

    throw new Error(jsonResponse.message)
  }

  async register(username, email, password, sudoPassword) {
    const response = await fetch(API_AUTH_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        sudoPassword: sudoPassword
      })
    }).catch((error) => {
      console.error('There was an error during the registration', error)
    })

    if (!response) {
      throw new Error('Failed to register')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      return jsonResponse.message
    }

    throw new Error(jsonResponse.message)
  }

  async passwordForgot(email) {
    const response = await fetch(API_AUTH_URL + 'request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    }).catch((error) => {
      console.error('There was an error during the password forgot', error)
    })

    if (!response) {
      throw new Error('Failed to send the email')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      return jsonResponse.message
    }

    throw new Error(jsonResponse.message)
  }

  async passwordReset(token, password) {
    const response = await fetch(API_AUTH_URL + 'reset_password/' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        new_password: password
      })
    }).catch((error) => {
      console.error('There was an error during the password reset', error)
    })

    if (!response) {
      throw new Error('Failed to reset the password')
    }

    const jsonResponse = await response.json()

    if (response.ok) {
      return jsonResponse.message
    }

    throw new Error(jsonResponse.message)
  }
}

export default new UserApiService()
