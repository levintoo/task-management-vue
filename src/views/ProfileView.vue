<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
import { Label } from '@/components/ui/label/index.js'
import { Input } from '@/components/ui/input/index.js'
import { Button } from '@/components/ui/button/index.js'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator/index.js'
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
              class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm text-gray-700 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start bg-gray-50"
              to="/settings/profile"
              >Profile</RouterLink
            ><RouterLink
              class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm text-gray-700 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"
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
                <h3 class="mb-0.5 text-base font-medium text-gray-800">Profile information</h3>
                <p class="text-sm text-muted-foreground text-gray-700">
                  Update your name and email address
                </p>
              </header>
              <form class="space-y-6">
                <div class="grid gap-2">
                  <Label for="name">Name</Label>
                  <Input class="mt-1" id="name" type="text" />
                  <div class="mt-1 hidden">
                    <p class="text-sm text-red-600 dark:text-red-500">foo</p>
                  </div>
                </div>
                <div class="grid gap-2">
                  <Label for="email">Email</Label>
                  <Input class="mt-1" id="email" type="email" />
                </div>
                <div class="flex items-center gap-4">
                  <Button>Save</Button>
                </div>
              </form>
            </div>
            <div class="space-y-6">
              <header>
                <h3 class="mb-0.5 text-base font-medium text-gray-800">Delete account</h3>
                <p class="text-sm text-muted-foreground text-gray-700">
                  Delete your account and all of its resources
                </p>
              </header>

              <Alert class="bg-red-50 rounded-lg border border-red-100" variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please proceed with caution, this cannot be undone.
                </AlertDescription>
                <Button class="mt-3" variant="destructive">Delete account</Button>
              </Alert>
            </div>
          </section>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
