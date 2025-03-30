<script setup>
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <RouterView />

  <Toaster :visibleToasts="9" closeButton richColors />
</template>
