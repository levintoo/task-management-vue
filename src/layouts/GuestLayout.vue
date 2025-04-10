<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <img class="size-12" alt="Vue logo" src="../assets/logo.svg" width="125" height="125" />

    <nav>
      <RouterLink class="hover:underline text-blue-700" to="/">Home</RouterLink>
      <RouterLink class="hover:underline text-blue-700" to="/login">Login</RouterLink>
      <RouterLink class="hover:underline text-blue-700" to="/dashboard">Dashboard</RouterLink>
      <RouterLink class="hover:underline text-blue-700" to="/admin">Admin</RouterLink>
    </nav>
  </header>

  <slot />
</template>
