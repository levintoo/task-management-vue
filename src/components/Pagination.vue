<script setup>
import { computed } from 'vue'

const emit = defineEmits(['navigate'])

const props = defineProps({
  meta: Object,
})

const links = computed(() => props.meta.links ?? [])
const to = computed(() => props.meta.to)
const from = computed(() => props.meta.from)
const total = computed(() => props.meta.total)

const navigate = (link) => {
  if (!link) return null
  const page = new URL(link).searchParams.get('page')
  emit('navigate', page)
}
</script>

<template>
  <div
    v-if="links.length > 3"
    class="flex items-center justify-between bg-gray-50 border-b border-slate-200 px-4 py-1.5 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="navigate(meta.links[0].url)"
        class="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Previous
      </button>
      <button
        @click="navigate(meta.links[meta.links.length - 1].url)"
        class="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Next
      </button>
    </div>

    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-slate-700">
          Showing
          <span class="font-medium">{{ from }}</span>
          to
          <span class="font-medium">{{ to }}</span>
          of
          <span class="font-medium">{{ total }}</span>
          results
        </p>
      </div>
      <div class="divide-x divide-slate-200">
        <nav class="isolate inline-flex rounded-md shadow-xs" aria-label="Pagination">
          <ul
            class="inline-flex items-center border border-r-0 last:border-r last:rounded-e-lg first:rounded-s-lg overflow-hidden"
            v-for="(link, key) in links"
            :key="key"
          >
            <li>
              <span
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                :class="{
                  'text-white border-blue-500 bg-gradient-to-l from-blue-500 to-blue-600 hover:bg-gradient-to-r':
                    link.active,
                  'text-slate-400 bg-white': !link.active,
                }"
                v-if="link.url === null"
                v-html="link.label"
              >
              </span>
              <button
                @click="navigate(link.url)"
                v-else
                class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold"
                :class="{
                  'text-white border-blue-500 bg-gradient-to-l from-blue-500 to-blue-600':
                    link.active,
                  'text-slate-600 bg-white hover:bg-slate-50/80': !link.active,
                }"
                v-html="link.label"
              ></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
