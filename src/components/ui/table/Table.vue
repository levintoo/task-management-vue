<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table
      :class="cn('w-full divide-y divide-gray-200 border-b border-t border-slate-200', props.class)"
    >
      <slot />
    </table>
  </div>
</template>
