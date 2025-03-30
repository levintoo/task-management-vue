<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-gray-900/10 dark:bg-gray-50/10', props.class)" />
</template>
