<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import {
  FileMinus2,
  CircleEllipsis,
  Clock,
  House,
  ClipboardList,
  Users,
  Earth,
  Layers,
} from 'lucide-vue-next'
import TeamSwitcher from '@/components/TeamSwitcher.vue'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'

const props = defineProps({
  side: { type: String, required: false },
  variant: { type: String, required: false },
  collapsible: { type: String, required: false, default: 'icon' },
  class: { type: null, required: false },
})

const data = {
  teams: [
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
  ],
  navMain: [
    {
      title: 'Docs',
      url: '#',
      icon: FileMinus2,
    },
    {
      title: 'Dashboard',
      url: '#',
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
  ],
  projects: [
    {
      name: 'Everything',
      url: '#',
      icon: Earth,
    },
    {
      name: 'Team Space',
      url: '#',
      icon: Users,
    },
    {
      name: 'Product Requirements',
      url: '#',
      icon: ClipboardList,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects class="flex-1" :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
