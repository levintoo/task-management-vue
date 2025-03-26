import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes.js'
import { useAuthStore } from '@/stores/useAuthStore.js'
import { toast } from 'vue-sonner'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.guard) return next()

  const auth = useAuthStore()

  try {
    const response = await auth.fetchUser()

    // TODO show error page instead
    if (to.meta.guard.includes('admin') && !auth.isAdmin) {
      toast.error('You do not have permission to access this page.')
      return next(from.fullPath)
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
