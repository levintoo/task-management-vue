import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes.js'
import { useAuthStore } from '@/stores/useAuthStore.js'

const ErrorView = () => import('@/views/ErrorView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  document.title = to?.meta?.title ?? 'Kanban'

  if (!to?.meta?.guard) return next()

  const auth = useAuthStore()

  try {
    const response = await auth.fetchUser()

    if (to.meta.guard.includes('admin') && !auth.isAdmin) {
      to.matched[0].components = {
        default: ErrorView,
      }
      to.matched[0].props = {
        default: () => ({ status: 403 }),
      }
      return next()
    }

    if (response.status !== 200) {
      auth.user = null
      if (to.meta.guard.includes('auth')) return next({ name: 'login' })
    }
    if (to.meta.guard.includes('guest')) return next({ name: 'dashboard' })
    return next()
  } catch {
    auth.user = null
    if (to.meta.guard.includes('auth')) return next({ name: 'login' })
  }

  next()
})

export default router
