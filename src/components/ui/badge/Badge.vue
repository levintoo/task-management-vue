<script setup>
import { cn } from '@/lib/utils'
import { badgeVariants } from '.'

const props = defineProps({
  variant: { type: null, required: false },
  class: { type: null, required: false },
  dot: { type: Boolean, default: true, required: false },
})
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <template v-if="dot">
      <span
        v-if="variant === 'success'"
        class="size-1.5 inline-block rounded-full bg-teal-500"
      ></span>
      <span
        v-else-if="variant === 'warning'"
        class="size-1.5 inline-block rounded-full bg-orange-500"
      ></span>
      <span
        v-else-if="variant === 'destructive'"
        class="size-1.5 inline-block rounded-full bg-red-500"
      ></span>
      <span
        v-else-if="variant === 'info'"
        class="size-1.5 inline-block rounded-full bg-blue-500"
      ></span>
      <span v-else class="size-1.5 inline-block rounded-full bg-slate-500"></span>
    </template>
    <slot />
  </div>
</template>
