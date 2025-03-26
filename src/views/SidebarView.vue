<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
</script>

<template>
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50">foo</div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50">foo</div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50">foo</div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50">foo</div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
