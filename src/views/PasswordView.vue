<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
import { Separator } from '@/components/ui/separator/index.js'
import { Button } from '@/components/ui/button/index.js'
import { Label } from '@/components/ui/label/index.js'
import { Input } from '@/components/ui/input/index.js'
import { ref } from 'vue'

const form = ref({
  password: '',
  new_password: '',
  password_confirmation: '',
})

const submit = () => {
  console.log(form.value)
}
</script>

<template>
  <AppLayout>
    <div
      class="inline-flex w-full items-center justify-between gap-3 border-gray-200 border-b px-5 py-2.5"
    >
      <div class="inline-flex items-center gap-3">
        <div class="flex items-center gap-2 py-[1px]">
          <SidebarTrigger class="-ml-1" />
        </div>
        <h1 class="text-sm font-semibold text-slate-800">Profile Settings</h1>
      </div>
    </div>
    <div class="p-3">
      <div class="flex flex-col space-y-8 md:space-y-0 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside class="w-full max-w-xl lg:w-48">
          <nav class="flex flex-col space-x-0 space-y-1">
            <RouterLink
              class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"
              to="/settings/profile"
              >Profile</RouterLink
            ><RouterLink
              class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start bg-gray-50"
              to="/settings/password"
              >Password</RouterLink
            >
          </nav>
        </aside>
        <Separator class="relative shrink-0 bg-border h-px w-full my-6 md:hidden" />
        <div class="flex-1 md:max-w-2xl">
          <section class="max-w-xl space-y-12">
            <div class="flex flex-col space-y-6">
              <header>
                <h3 class="mb-0.5 text-base font-medium text-gray-800">Update password</h3>
                <p class="text-sm text-muted-foreground text-gray-700">
                  Ensure your account is using a long, random password to stay secure
                </p>
              </header>
              <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-2">
                  <Label for="password">Current password</Label>
                  <Input v-model="form.password" class="mt-1" id="password" type="password" />
                  <div class="mt-1 hidden">
                    <p class="text-sm text-red-600 dark:text-red-500">foo</p>
                  </div>
                </div>
                <div class="grid gap-2">
                  <Label for="new_password">New password</Label>
                  <Input
                    v-model="form.new_password"
                    class="mt-1"
                    id="new_password"
                    type="password"
                  />
                </div>
                <div class="grid gap-2">
                  <Label for="confirm_password">Confirm password</Label>
                  <Input
                    v-model="form.password_confirmation"
                    class="mt-1"
                    id="confirm_password"
                    type="password"
                  />
                </div>
                <div class="flex items-center gap-4">
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
