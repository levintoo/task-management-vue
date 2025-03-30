<script setup>
import { useAdminUsersStore } from '@/stores/admin/useUsersStore.js'
import { onBeforeMount, ref } from 'vue'
import { extractErrorMessage } from '@/lib/error-handler.js'
import { toast } from 'vue-sonner'
import AppLayout from '@/views/layouts/AppLayout.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu/index.js'
import { SidebarTrigger } from '@/components/ui/sidebar/index.js'
import {
  Plus,
  SlidersHorizontal,
  Search,
  ArrowUpDown,
  ChevronRightIcon,
  ChevronLeftIcon,
  Ellipsis,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button/index.js'
import { Input } from '@/components/ui/input/index.js'

const store = useAdminUsersStore()

const fetch = async () => {
  try {
    await store.fetchUsers()
  } catch (error) {
    const message = extractErrorMessage(error)
    toast.error(message)
  }
}

onBeforeMount(async () => fetch())

const position = ref('asc')
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
                  href="#"
                  as="a"
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
                <DropdownMenuRadioGroup v-model="position">
                  <DropdownMenuRadioItem value="asc"> Asc </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc"> Desc </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By: Name</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup v-model="position">
                  <DropdownMenuRadioItem value="name-sc"> Asc </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-desc"> Desc </DropdownMenuRadioItem>
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
            class="text-white h-auto px-3 py-2 text-xs inline-flex items-center justify-center gap-x-2"
          >
            Add User
            <Plus class="size-4 shrink-0" :stroke-width="2" />
          </Button>
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
                        <span class="text-xs font-semibold uppercase text-gray-800"> Created </span>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-start">
                      <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase text-gray-800"> Name </span>
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
                        <span class="text-sm text-gray-600">{{
                          user.created_at.toLocaleString()
                        }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">{{ user.name }}</span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span
                          class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full"
                        >
                          <svg
                            class="size-2.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                            />
                          </svg>
                          {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                        </span>
                      </div>
                    </td>
                    <td class="size-px whitespace-nowrap">
                      <div class="px-6 py-1.5 flex justify-end">
                        <div
                          class="group inline-flex items-center border-gray-300 bg-white shadow-2xs rounded-lg transition-all"
                        >
                          <Button class="size-7" variant="outline" size="icon">
                            <Ellipsis />
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End Table -->

              <!-- Footer -->
              <div
                class="px-6 py-1.5 grid gap-3 md:flex md:justify-between md:items-center border-t border-b border-gray-200"
              >
                <div class="max-w-sm space-y-3">
                  <select
                    class="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option selected>9</option>
                    <option>20</option>
                  </select>
                </div>

                <div>
                  <div class="inline-flex gap-x-2">
                    <Button variant="outline" class="text-xs">
                      <ChevronLeftIcon />
                      Prev
                    </Button>
                    <Button variant="outline" class="text-xs">
                      Next
                      <ChevronRightIcon />
                    </Button>
                  </div>
                </div>
              </div>
              <!-- End Footer -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
    <!-- End Table Section -->

    <!--    {{ position }}-->
    <!--    <button @click="fetch">Fetch Users</button>/-->
    <!--    {{ store?.users }}-->
  </AppLayout>
</template>
