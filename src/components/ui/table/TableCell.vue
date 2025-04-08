<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <td class="size-px whitespace-nowrap">
    <div :class="cn('px-6 py-2 text-sm text-gray-600', props.class)">
      <slot />
    </div>
  </td>
</template>
