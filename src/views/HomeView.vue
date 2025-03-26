<script setup>
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'
import { User, CreditCard } from 'lucide-vue-next'

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)
</script>

<template>
  <div>
    <h1>This is the home page</h1>
  </div>
  <div class="max-w-2xl px-1 mx-auto space-y-4">
    <div>
      <Button>Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="link">Button</Button>
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary">Button</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="start" side="bottom" sideOffset="1">
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div>
      <UseTemplate>
        <form class="grid items-start gap-4 overflow-y-auto px-4 md:px-0.5">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" default-value="shadcn@example.com" />
          </div>
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input id="username" default-value="@shadcn" />
          </div>
          <Button type="submit" class="w-full md:w-fit"> Save changes </Button>
        </form>
      </UseTemplate>

      <Dialog v-if="isDesktop" v-model:open="isOpen">
        <DialogTrigger as-child>
          <Button variant="secondary"> Edit Profile </Button>
        </DialogTrigger>
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
        <DrawerTrigger as-child>
          <Button variant="outline"> Edit Profile </Button>
        </DrawerTrigger>
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

    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline"> Edit Profile </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
            <div class="py-4">
              <GridForm />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
