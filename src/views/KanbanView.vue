<script setup>
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
import {
  Kanban,
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
  LayoutGrid,
  Table2,
  FilePenLine,
  Trash2,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/index.js'
import { Button } from '@/components/ui/button/index.js'
import AppLayout from '@/views/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <div
      class="inline-flex w-full items-center justify-between gap-3 border-b border-gray-200 px-5 py-2.5"
    >
      <div class="inline-flex items-center gap-3">
        <div class="flex items-center gap-2">
          <SidebarTrigger class="-ml-1" />
        </div>
        <h1 class="text-sm font-semibold text-gray-800">Design Kanban</h1>
      </div>

      <div class="relative">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button class="size-6" size="icon" variant="ghost">
              <MoreHorizontal class="size-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48 text-gray-700" align="end" side="bottom">
            <DropdownMenuItem>
              <FilePenLine />
              <span>Rename Board</span>
            </DropdownMenuItem>
            <DropdownMenuItem class="text-red-500 hover:!text-red-500">
              <Trash2 />
              <span>Delete Board</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div class="w-screen md:w-auto overflow-x-auto">
      <div
        class="flex justify-between overflow-y-auto border-b border-gray-200 bg-gray-50 px-5 gap-8"
      >
        <div class="flex shrink-0 gap-5 *:py-3">
          <div class="inline-flex items-center gap-2 text-sm text-gray-600">
            <LayoutGrid class="size-4 shrink-0" :stroke-width="2" />
            Overview
          </div>

          <div
            class="inline-flex items-center gap-2 border-b-2 border-gray-800 text-sm font-semibold text-gray-800"
          >
            <Kanban class="size-4 shrink-0" :stroke-width="2" />
            Board
          </div>

          <div class="inline-flex items-center gap-2 text-sm text-gray-600">
            <Table2 class="size-4 shrink-0" :stroke-width="2" />
            List
          </div>
        </div>

        <div class="inline-flex items-center gap-x-1 py-1">
          <Button
            href="#"
            as="a"
            variant="outline"
            class="text-gray-600 h-auto px-3 py-2 text-xs inline-flex items-center justify-center gap-x-2"
          >
            <SlidersHorizontal class="size-4 shrink-0" :stroke-width="2" />
            Filter
          </Button>

          <hr class="w-4 rotate-90" />

          <Button
            class="text-white h-auto px-3 py-2 text-xs inline-flex items-center justify-center gap-x-2"
          >
            Add List
            <Plus class="size-4 shrink-0" :stroke-width="2" />
          </Button>
        </div>
      </div>
    </div>

    <div class="flex min-h-[169px] gap-3 overflow-y-auto px-3 py-3">
      <div
        class="h-fit w-64 shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-1 sortable-chosen"
        data-draggable="true"
        draggable="true"
      >
        <div class="flex items-center justify-between gap-2 p-2">
          <div class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700">
            To Do <span class="text-gray-500">2</span>
          </div>
          <div class="inline-flex items-center gap-1 text-sm text-gray-700">
            <div class="relative">
              <button class="rounded-lg p-1 text-gray-500 hover:bg-slate-100">
                <MoreHorizontal class="size-4 shrink-0" />
              </button>
            </div>
            <button class="rounded-lg p-1 text-gray-500 hover:bg-slate-100">
              <Plus class="size-4 shrink-0" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1">
          <div
            class="group relative space-y-2 rounded-lg border border-slate-200/70 bg-white p-2 text-sm text-gray-700 transition-all"
            data-draggable="true"
          >
            <p>Make a sandwitch</p>
            <hr class="border-transparent" />
            <div class="flex items-center justify-between transition-all">
              <div class="inline-flex items-center gap-2">
                <button class="rounded-lg bg-white p-1 text-gray-500 hover:bg-slate-100">
                  <MoreHorizontal class="size-4 shrink-0" />
                </button>
              </div>
              <div class="inline-flex items-center gap-2 text-gray-500">25 Mar 2025</div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="h-fit w-64 shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-1 sortable-chosen"
        data-draggable="true"
        draggable="true"
      >
        <div class="flex items-center justify-between gap-2 p-2">
          <div class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700">
            In Progress <span class="text-gray-500">6</span>
          </div>

          <div class="inline-flex items-center gap-1 text-sm text-gray-700">
            <div class="relative">
              <button class="rounded-lg p-1 text-gray-500 hover:bg-slate-100">
                <MoreHorizontal class="size-4 shrink-0" />
              </button>
            </div>

            <button class="rounded-lg p-1 text-gray-500 hover:bg-slate-100">
              <Plus class="size-4 shrink-0" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-1">
          <div
            class="group relative space-y-2 rounded-lg border border-slate-200/70 bg-white p-2 text-sm text-gray-700 transition-all"
            data-draggable="true"
          >
            <p>Make a sandwitch</p>

            <hr />

            <div class="flex items-center justify-between transition-all">
              <div class="inline-flex items-center gap-2">
                <button class="rounded-lg bg-white p-1 text-gray-500 hover:bg-slate-100">
                  <MoreHorizontal class="size-4 shrink-0" />
                </button>
              </div>

              <div class="inline-flex items-center gap-2 text-gray-500">25 Mar 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden flex flex-1 flex-col gap-4 p-4">
      <div
        v-for="i in 10"
        :key="i"
        :class="`gradient-${i}`"
        class="text-white grid place-content-center size-8 rounded-lg border-none"
      >
        <Kanban class="size-4 shrink-0" />
      </div>
    </div>
  </AppLayout>
</template>
