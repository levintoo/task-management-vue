<script setup>
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { CircleEllipsis, User, FileMinus2, House } from 'lucide-vue-next'
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
    title: 'Profile',
    url: { name: 'settings.profile' },
    icon: User,
    get active() {
      return route.name === this.url.name || route.name === 'settings.password'
    },
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
        <SidebarMenuButton
          :is-active="item?.active ? true : route.name === item?.url?.name"
          :tooltip="item.title"
          as-child
        >
          <RouterLink :to="item.url">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </RouterLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
