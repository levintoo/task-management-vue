<script setup>
import { useAdminUsersStore } from '@/stores/admin/useUsersStore.js'
import { onBeforeMount, onMounted, ref, unref, watch } from 'vue'
import { extractErrorMessage } from '@/lib/error-handler.js'
import { toast } from 'vue-sonner'
import { debounce, isNil, omitBy } from 'lodash'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import AppLayout from '@/views/layouts/AppLayout.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu/index.js'
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
import { Plus, SlidersHorizontal, Search, ArrowUpDown, Ellipsis, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button/index.js'
import { Input } from '@/components/ui/input/index.js'
import { Badge } from '@/components/ui/badge/index.js'
import { Label } from '@/components/ui/label/index.js'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer/index.js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/index.js'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Pagination from '@/components/Pagination.vue'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useAdminUsersStore()

const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)

const filters = ref({
  search: '',
  field: 'created_at',
  direction: 'desc',
  role: '',
  page: null,
})

const form = ref({
  nam: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
})

const validationErrors = ref({})

const fetch = async (filters = {}) => {
  try {
    await store.fetchUsers(filters)
  } catch (error) {
    const message = extractErrorMessage(error)
    toast.error(message)
  }
}

const createUser = async () => {
  try {
    await store.addUser(form.value)
    isOpen.value = false
  } catch (error) {
    if (error.status) {
      validationErrors.value = error.response.data.errors
    }
    const message = extractErrorMessage(error)
    toast.error(message)
  }
}

const deleteUser = async (id) => {
  try {
    await store.deleteUser(id)
  } catch (error) {
    const message = extractErrorMessage(error)
    toast.error(message)
  }
}

const navigate = (page) => {
  filters.value.page = page
}

watch(
  filters,
  debounce(async (value) => {
    await fetch(value).then(() => {
      router.replace({
        name: 'admin.users',
        query: omitBy(unref(filters), (v) => isNil(v) || v === ''),
      })
    })
  }, 500),
  { deep: true },
)

onBeforeMount(async () => {
  Object.assign(
    filters.value,
    omitBy(route.query, (v) => isNil(v) || v === ''),
  )
  await fetch(omitBy(unref(filters), (v) => isNil(v) || v === ''))
})
</script>

<template>
  <AppLayout>
    <div
      class="inline-flex w-full items-center justify-between gap-3 border-b border-gray-200 px-5 py-2.5"
    >
      <div class="inline-flex items-center gap-3">
        <div class="flex items-center gap-2 py-[1px]">
          <SidebarTrigger class="-ml-1" />
        </div>
        <h1 class="text-sm font-semibold text-gray-800">Users</h1>
      </div>
    </div>

    <div class="w-screen md:w-auto overflow-x-auto">
      <div class="flex justify-between overflow-y-auto border-b border-gray-200 px-5 gap-8">
        <div class="inline-flex items-center gap-x-1">
          <div class="relative">
            <Input
              v-model="filters.search"
              class="bg-white text-xs h-auto pl-8 pr-3 py-2 placeholder:text-gray-400"
              placeholder="Search"
            />
            <Search
              class="absolute size-4 shrink-0 inset-0 ml-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div class="inline-flex items-center gap-x-1 py-1.5">
          <div class="relative">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  class="text-gray-600 h-auto px-3 py-2 text-xs inline-flex items-center justify-center gap-x-2"
                >
                  <ArrowUpDown class="size-4 shrink-0" :stroke-width="2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-48 text-gray-700" align="end" side="bottom">
                <DropdownMenuLabel>Sort By: Created At</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup v-model="filters.direction">
                  <DropdownMenuRadioItem value="asc"> Asc </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc"> Desc </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
            @click="isOpen = !isOpen"
            class="text-white h-auto px-3 py-2 text-xs inline-flex items-center justify-center gap-x-2"
          >
            Add User
            <Plus class="size-4 shrink-0" :stroke-width="2" />
          </Button>

          <UseTemplate>
            <form
              @submit.prevent="createUser()"
              class="grid items-start gap-4 overflow-y-auto px-4 md:px-0.5"
            >
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input v-model="form.email" id="email" type="email" placeholder="jane@doe.com" />
                <p
                  class="text-red-500 text-sm"
                  v-for="error in validationErrors['email']"
                  :key="error"
                >
                  {{ error }}
                </p>
              </div>
              <div class="grid gap-2">
                <Label for="name">Name</Label>
                <Input v-model="form.name" id="name" placeholder="Jane Doe" />
                <p
                  class="text-red-500 text-sm"
                  v-for="error in validationErrors['name']"
                  :key="error"
                >
                  {{ error }}
                </p>
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                  v-model="form.password"
                  id="password"
                  placeholder="password"
                  type="password"
                />
                <p
                  class="text-red-500 text-sm"
                  v-for="error in validationErrors['password']"
                  :key="error"
                >
                  {{ error }}
                </p>
              </div>
              <div class="grid gap-2">
                <Label for="password">Confirm Password</Label>
                <Input
                  v-model="form.password_confirmation"
                  id="password"
                  placeholder="password"
                  type="password"
                />
                <p
                  class="text-red-500 text-sm"
                  v-for="error in validationErrors['password_confirmation']"
                  :key="error"
                >
                  {{ error }}
                </p>
              </div>
              <div class="grid gap-2">
                <Label for="role">Role</Label>
                <Select v-model="form.role">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="admin"> Admin </SelectItem>
                      <SelectItem value="user"> User </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p
                  class="text-red-500 text-sm"
                  v-for="error in validationErrors['role']"
                  :key="error"
                >
                  {{ error }}
                </p>
              </div>
              <Button type="submit" class="w-full md:w-fit"> Save changes </Button>
            </form>
          </UseTemplate>

          <Dialog v-if="isDesktop" v-model:open="isOpen">
            <DialogContent class="grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <GridForm />
            </DialogContent>
          </Dialog>

          <Drawer v-else v-model:open="isOpen">
            <DrawerContent>
              <DrawerHeader class="text-left">
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <GridForm />
              <DrawerFooter class="pt-2">
                <DrawerClose as-child>
                  <Button variant="outline"> Cancel </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="w-screen md:w-full mx-auto">
      <!-- Card -->
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 w-full inline-block align-middle">
            <div class="bg-white shadow-2xs">
              <!-- Table -->
              <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800"> Id </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800"> Name </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800"> Role </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800"> Email </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800"> Created </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800">
                          Email Status
                        </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-end"></th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                  <tr v-for="user in store.users" :key="user.id">
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">{{ user.id }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">{{ user.name }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">{{ user.role.toLowerCase() }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">{{ user.email }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">{{ user.created_at }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-1.5 space-x-2">
                        <Badge variant="warning">
                          {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                        </Badge>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-1.5 flex justify-end">
                        <div
                          class="group inline-flex items-center border-gray-300 bg-white shadow-2xs rounded-lg transition-all"
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button class="size-7" variant="outline" size="icon">
                                <Ellipsis />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              class="w-48 text-gray-700"
                              align="end"
                              side="bottom"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                @click="deleteUser(user.id)"
                                class="text-rose-500 hover:text-rose-600 focus:text-rose-600"
                              >
                                <Trash2 /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End Table -->

              <!-- Footer -->
              <Pagination @navigate="navigate" :meta="store?.meta" />
              <!-- End Footer -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
    <!-- End Table Section -->
  </AppLayout>
</template>
