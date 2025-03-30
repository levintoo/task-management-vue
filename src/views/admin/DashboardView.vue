<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js'
import AppLayout from '@/views/layouts/AppLayout.vue'

const auth = useAuthStore()
</script>

<template>
  <AppLayout>
    <p>Welcome, {{ auth?.user?.name }}</p>
    <h1>This the admin dashboard page</h1>
  </AppLayout>
</template>
