import { defineStore } from 'pinia'
import axios from '@/lib/axios.js'

export const useAdminUsersStore = defineStore('admin_users', {
  state: () => ({
    users: [],
    filters: [],
    meta: [],
  }),

  getters: {
    //
  },

  actions: {
    async fetchUsers(filters = {}) {
      const queryString = new URLSearchParams(filters).toString()
      const response = await axios.get(`/api/admin/users?${queryString}`)
      this.users = response.data.data
      this.filters = response.data.filters
      this.meta = response.data.meta
      return response
    },

    async addUser(form) {
      const response = await axios.post('/api/admin/users/create', form)
      await this.fetchUsers()
      return response
    },

    async deleteUser(id) {
      const response = await axios.delete(`/api/admin/users/${id}`)
      await this.fetchUsers()
      return response
    },
  },
})
