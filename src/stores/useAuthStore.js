import { defineStore } from 'pinia'
import axios from '@/utils/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: [],
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user.role === 'ADMIN',
  },

  actions: {
    async getCSRFToken() {
      return await axios.get('/sanctum/csrf-cookie')
    },

    async login({ email, password }) {
      await this.getCSRFToken()
      return await axios.post('/login', { email: email, password: password })
    },

    async fetchUser() {
      const response = await axios.get('/api/user')
      this.user = response.data.data
      return response
    },

    async logout() {
      const response = await axios.post('/logout')
      this.user = null
      return response
    },
  },
})
