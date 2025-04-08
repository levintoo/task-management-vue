<script setup>
import { ArrowDown, ArrowUp } from 'lucide-vue-next'
import { Button } from '@/components/ui/button/index.js'

defineProps({
  class: { type: null, required: false },
  label: { type: String, required: true },
  field: { type: String, required: false },
  sortField: { type: String, required: false },
  sortDirection: { type: String, required: false },
})

const emit = defineEmits(['sort'])

const sort = (field) => {
  emit('sort', field)
}
</script>

<template>
  <th scope="col" class="text-start">
    <Button
      variant="ghost"
      v-if="field"
      @click="sort(field)"
      class="px-6 py-3 flex items-center gap-x-2 rounded-none"
    >
      <span class="text-xs font-semibold uppercase text-gray-800"> {{ label }} </span>
      <ArrowUp
        v-if="sortField === field && sortDirection === 'asc'"
        class="size-4 shrink-0 text-gray-600"
      />
      <ArrowDown
        v-else-if="sortField === field && sortDirection === 'desc'"
        class="size-4 shrink-0 text-gray-600"
      />
    </Button>
    <span
      v-else
      class="px-6 py-3 flex items-center gap-x-2 text-xs font-semibold uppercase text-gray-800"
    >
      {{ label }}
    </span>
  </th>
</template>
