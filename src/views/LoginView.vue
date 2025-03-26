<script setup>
import { toast } from 'vue-sonner'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore.js'
import router from '@/router/index.js'
import { extractErrorMessage } from '@/utils/error-handler.js'

const form = ref({
  email: '',
  password: '',
})

const validationErrors = ref({})

const auth = useAuthStore()

const login = async () => {
  try {
    await auth.login(form.value)
    await router.push({ name: 'dashboard' })
  } catch (error) {
    const message = extractErrorMessage(error)
    toast.error(message)
    if (error.response && error.response.status === 422) {
      validationErrors.value = error.response.data.errors
    }
  }
}
</script>

<template>
  <div>
    <h1>This is the login page</h1>
    <form class="mx-auto max-w-2xl space-y-4">
      <!-- Form Group -->
      <div>
        <label for="email" class="block text-sm mb-2">Email address</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        />
        <template v-if="Object.keys(validationErrors).length">
          <p
            v-for="msg in validationErrors['email']"
            :key="msg"
            class="text-sm text-red-600 mt-2"
            id="email-error"
          >
            {{ msg }}
          </p>
        </template>
      </div>
      <!-- End Form Group -->

      <!-- Form Group -->
      <div>
        <label for="password" class="block text-sm mb-2">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        />
        <template v-if="Object.keys(validationErrors).length">
          <p
            v-for="msg in validationErrors['password']"
            :key="msg"
            class="text-sm text-red-600 mt-2"
            id="email-error"
          >
            {{ msg }}
          </p>
        </template>
      </div>
      <!-- End Form Group -->

      <div class="inline-flex gap-x-2">
        <button
          type="button"
          class="py-2 px-3 inline-flex hidden items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          View all
        </button>

        <button
          @click="login"
          type="button"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Login
        </button>
      </div>

      <div>{{ auth.user }}</div>
    </form>
  </div>
</template>
