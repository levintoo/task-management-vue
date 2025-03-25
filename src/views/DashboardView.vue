<script setup>
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()
</script>

<template>
  <div>
    <p>Welcome, {{ auth?.user?.name }}</p>
    <h1>This the dashboard page</h1>
  </div>
</template>
