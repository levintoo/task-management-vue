import HomeView from '@/views/HomeView.vue'

const DashboardView = () => import('../views/DashboardView.vue')
const LoginView = () => import('../views/LoginView.vue')
const AdminDashboardView = () => import('../views/admin/DashboardView.vue')
const NotFoundView = () => import('../views/ErrorView.vue')

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      guard: ['guest'],
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      guard: ['auth'],
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView,
    meta: {
      guard: ['auth', 'admin'],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    props: {
      status: 404,
    },
  },
]
