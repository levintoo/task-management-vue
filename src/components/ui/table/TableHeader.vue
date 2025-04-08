<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <div
    :class="
      cn(
        'border-t bg-white border-slate-200 font-medium [&>tr]:last:border-b-0 dark:bg-gray-800/50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
