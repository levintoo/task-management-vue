<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/useAuthStore.js'
import router from '@/router/index.js'

const auth = useAuthStore()

const logout = async () => {
  await auth.logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <!--  <header>-->
  <!--    <img class="size-12" alt="Vue logo" src="@/assets/logo.svg" width="125" height="125" />-->

  <!--    <nav>-->
  <!--      <RouterLink class="hover:underline text-blue-700" to="/">Home</RouterLink>-->
  <!--      <RouterLink class="hover:underline text-blue-700" to="/login">Login</RouterLink>-->
  <!--      <RouterLink class="hover:underline text-blue-700" to="/dashboard">Dashboard</RouterLink>-->
  <!--      <RouterLink class="hover:underline text-blue-700" to="/admin">Admin</RouterLink>-->
  <!--      <button class="hover:underline text-blue-700" @click="logout()">Logout</button>-->
  <!--    </nav>-->
  <!--  </header>-->

  <RouterView />

  <Toaster :visibleToasts="9" closeButton richColors />
</template>
