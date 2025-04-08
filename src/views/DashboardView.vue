<script setup>
import AppLayout from '@/views/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/useAuthStore.js'

const auth = useAuthStore()
</script>

<template>
  <AppLayout>
    <p>Welcome, {{ auth?.user?.name }}</p>
    <h1>This the dashboard page</h1>
  </AppLayout>
</template>
