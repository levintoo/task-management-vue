<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <tbody :class="cn('divide-y divide-gray-200', props.class)">
    <slot />
  </tbody>
</template>
