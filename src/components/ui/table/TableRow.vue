<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <tr :class="cn(props.class)">
    <slot />
  </tr>
</template>
