<script setup>
import { cn } from '@/lib/utils.js'
import { DrawerOverlay } from 'vaul-vue'
import { computed } from 'vue'

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DrawerOverlay
    v-bind="delegatedProps"
    :class="cn('fixed inset-0 z-50 bg-gray-500/75 opacity-75', props.class)"
  />
</template>
