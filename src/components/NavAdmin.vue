<script setup>
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible/index.js'
import { ChevronRight, Users, LayoutDashboard } from 'lucide-vue-next'
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar/index.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const navMain = [
  {
    title: 'Dashboard',
    url: { name: 'admin.dashboard' },
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    url: '#',
    icon: Users,
    items: [
      {
        title: 'All',
        url: { name: 'admin.users' },
      },
    ],
  },
]
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Admin</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in navMain"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem v-if="!item.items">
          <SidebarMenuButton
            :is-active="route.name === item.url.name"
            :tooltip="item.title"
            as-child
          >
            <RouterLink :to="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem v-else>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton :is-active="route.name === subItem.url.name" as-child>
                  <RouterLink :to="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
