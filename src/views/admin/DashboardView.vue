<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
import { DollarSign } from 'lucide-vue-next'
import { onBeforeMount, ref } from 'vue'
import axios from '@/lib/axios.js'
import { extractErrorMessage } from '@/lib/error-handler.js'
import { toast } from 'vue-sonner'

const data = ref()
const loading = ref(false)

const fetch = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/admin/dashboard')
    data.value = res.data
  } catch (error) {
    const message = extractErrorMessage(error)
    toast.error(message)
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => fetch())

import { AreaChart } from '@/components/ui/chart-area'
import { CurveType } from '@unovis/ts'
const foo = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Jul', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Aug', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Sep', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Oct', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Nov', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Dec', total: Math.floor(Math.random() * 2000) + 1000 },
]
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
        <h1 class="text-sm font-semibold text-slate-800">Admin Page</h1>
      </div>
    </div>
    <div class="p-3">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(stat, key) in data?.stats" :key="key" class="rounded-lg border shadow-sm">
          <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div class="tracking-tight text-sm text-slate-700 font-medium">{{ key }}</div>
            <DollarSign class="size-4 text-slate-500" />
          </div>
          <div class="p-6 pt-0">
            <div class="text-2xl font-bold text-slate-700">{{ stat }}</div>
            <p class="text-xs mt-1 text-slate-500">+20.1% from last month</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border shadow-sm isolate">
        <AreaChart
          v-if="data?.trend"
          class="h-[100px]"
          index="date"
          :data="data?.trend"
          :categories="['aggregate']"
          :show-grid-line="false"
          :show-legend="false"
          :show-x-axis="false"
          :show-y-axis="false"
          :curve-type="CurveType.Linear"
        />
      </div>
      {{ foo }}
      {{ data?.trend }}
    </div>
  </AppLayout>
</template>
