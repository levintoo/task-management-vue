<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js'
import { useAdminUsersStore } from '@/stores/admin/useUsersStore.js'
import { onBeforeMount } from 'vue'
import { extractErrorMessage } from '@/lib/error-handler.js'
import { toast } from 'vue-sonner'

const auth = useAuthStore()
const store = useAdminUsersStore()

const fetch = async () => {
  try {
    await store.fetchUsers()
  } catch (error) {
    const message = extractErrorMessage(error)
    toast.error(message)
  }
}

onBeforeMount(async () => fetch())
</script>

<template>
  <div>
    <p>Welcome, {{ auth?.user?.name }}</p>
    <h1>This the admin page</h1>
    <button @click="fetch">Fetch Users</button>/
    {{ store?.users }}
  </div>
</template>
