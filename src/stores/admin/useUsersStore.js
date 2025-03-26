import { defineStore } from 'pinia'
import axios from '@/lib/axios.js'

export const useAdminUsersStore = defineStore('admin_users', {
  state: () => ({
    users: [],
    filters: [],
  }),

  getters: {
    //
  },

  actions: {
    async fetchUsers() {
      const response = await axios.get('/api/admin/users')
      this.users = response.data.data
      this.filters = response.data.filters
      return response
    },
  },
})
