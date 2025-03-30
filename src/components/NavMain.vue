<script setup>
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { CircleEllipsis, Clock, FileMinus2, House, Layers } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const navMain = [
  {
    title: 'Kanban',
    url: { name: 'kanban' },
    icon: FileMinus2,
  },
  {
    title: 'Dashboard',
    url: { name: 'dashboard' },
    icon: House,
  },
  {
    title: 'Snapshots',
    url: '#',
    icon: Clock,
  },
  {
    title: 'Clips',
    url: '#',
    icon: Layers,
  },
  {
    title: 'More',
    url: '#',
    icon: CircleEllipsis,
  },
]
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in navMain" :key="item.name">
        <SidebarMenuButton :is-active="route.name === item.url.name" :tooltip="item.title" as-child>
          <RouterLink :to="item.url">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </RouterLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
