<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <div
    data-sidebar="group"
    :class="
      cn(
        'bg-gray-50 rounded-lg relative flex w-full min-w-0 flex-col p-2 group-data-[collapsible=icon]:bg-white',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
