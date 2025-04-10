<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Folder, MoreHorizontal, Trash2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const projects = [
  {
    name: 'Everything',
    url: '#',
  },
  {
    name: 'Team Space',
    url: '#',
  },
  {
    name: 'Product Requirements',
    url: '#',
  },
]

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Your Boards</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton :is-active="route.name === item.url.name" as-child :tooltip="item.name">
          <RouterLink :to="item.url">
            <span>{{ item.name }}</span>
          </RouterLink>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-48 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem>
              <Folder class="text-gray-500 dark:text-gray-400" />
              <span>View Kanban</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 class="text-gray-500 dark:text-gray-400" />
              <span>Delete Kanban</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <RouterLink to="/boards">
          <SidebarMenuButton tooltip="More" class="text-sidebar-foreground/70">
            <MoreHorizontal class="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </RouterLink>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
