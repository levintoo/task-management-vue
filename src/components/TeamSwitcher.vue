<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ChevronsUpDown, Plus, Kanban } from 'lucide-vue-next'

import { ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const teams = [
  {
    name: 'Personal Workspace',
    plan: 'Laravel',
    gradient: null,
  },
  {
    name: 'Acme Inc',
    plan: 'Enterprise',
    gradient: 2,
  },
  {
    name: 'Foo Inc',
    plan: 'Enterprise',
    gradient: 3,
  },
  {
    name: 'Acme Corp.',
    plan: 'Startup',
    gradient: 4,
  },
  {
    name: 'Evil Corp.',
    plan: 'Free',
    gradient: 5,
  },
]

const { isMobile } = useSidebar()
const activeTeam = ref(teams[0])
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-gray-50 data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square">
              <div
                v-if="activeTeam.gradient"
                :class="`gradient-${activeTeam.gradient}`"
                class="text-white grid place-content-center size-8 rounded-lg border-none"
              >
                <Kanban class="size-4 shrink-0" />
              </div>
              <AppIcon v-else class="size-8 shrink-0" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ activeTeam.name }}
              </span>
              <span class="truncate text-xs text-gray-600">{{ activeTeam.plan }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-60 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-gray-500 dark:text-gray-400">
            Teams
          </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="team in teams"
            :key="team.name"
            class="gap-2 py-2 px-3"
            @click="activeTeam = team"
          >
            <div
              v-if="team.gradient"
              :class="`gradient-${team.gradient}`"
              class="text-white grid place-content-center size-7 rounded-lg"
            >
              <Kanban class="size-4 shrink-0 border-none" />
            </div>
            <div v-else class="rounded-lg size-8 py-0.5 -ml-1-">
              <AppIcon class="shrink-0" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate">
                {{ team.name }}
              </span>
              <span class="truncate text-xs text-gray-500">{{ team.plan }}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div
              class="flex size-6 items-center justify-center rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
            >
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-gray-500 dark:text-gray-400">Add team</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
