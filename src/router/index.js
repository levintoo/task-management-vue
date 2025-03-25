import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes.js'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.guard !== 'auth' && to.meta.guard !== 'guest') {
    return next()
  }

  const auth = useAuthStore()

  try {
    const response = await auth.fetchUser()

    if (response.status !== 200) {
      auth.user = null
      if (to.meta.guard === 'auth') return next({ name: 'login' })
    }

    if (to.meta.guard === 'guest') return next({ name: 'dashboard' })
    return next()
  } catch {
    auth.user = null
    if (to.meta.guard === 'auth') return next({ name: 'login' })
  }

  next()
})

export default router
