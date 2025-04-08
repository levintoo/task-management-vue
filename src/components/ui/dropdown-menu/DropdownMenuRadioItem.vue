<script setup>
import { cn } from '@/lib/utils.js'
import { Circle } from 'lucide-vue-next'
import { DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps({
  value: { type: String, required: true },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
})

const emits = defineEmits(['select'])

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="
      cn(
        'relative group flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Circle
        :stroke-width="2"
        class="group-data-[state=checked]:block hidden size-4 fill-blue-500 text-blue-500"
      />
      <Circle
        :stroke-width="2"
        class="group-data-[state=checked]:hidden size-4 fill-white text-blue-500"
      />
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
