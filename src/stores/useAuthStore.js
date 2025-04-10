import { defineStore } from 'pinia'
import axios from '@/lib/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
  }),

  getters: {
    isAuthenticated: (state) => !!state?.user,
    isAdmin: (state) => state?.user?.role === 'ADMIN',
    initials: (state) => {
      if (!state?.user || typeof state.user !== 'object' || !state.user?.name?.trim()) {
        return ''
      }

      const parts = state.user.name.trim().split(/\s+/)
      const first = parts[0]?.charAt(0) || ''
      const second = parts.length > 1 ? parts[1].charAt(0) : parts[0]?.charAt(1) || ''
      return (first + second).toUpperCase()
    },
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
      this.user = {}
      return response
    },

    async updateUser({ name, email }) {
      const response = await axios.patch('/api/profile', {
        name: name,
        email: email,
      })
      if (response.status === 204) {
        this.user.name = name
        this.user.email = email
      }
      return response
    },

    async updatePassword({ password, new_password, new_password_confirmation }) {
      return await axios.patch('/api/profile', {
        password: password,
        new_password: new_password,
        new_password_confirmation: new_password_confirmation,
      })
    },

    async deleteUser(password) {
      const response = await axios.delete('/api/profile', {
        data: {
          password: password,
        },
      })
      this.user = {}
      return response
    },
  },
})
