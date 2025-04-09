import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'

const KanbanView = () => import('@/views/KanbanView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const AdminDashboardView = () => import('@/views/admin/DashboardView.vue')
const UsersView = () => import('@/views/admin/UsersView.vue')
const PasswordView = () => import('@/views/PasswordView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const NotFoundView = () => import('@/views/ErrorView.vue')

export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Welcome - Kanban',
    },
    component: HomeView,
  },
  {
    meta: {
      guard: ['guest'],
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
          title: 'Login - Kanban',
        },
      },
    ],
  },
  {
    meta: {
      guard: ['auth'],
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
          title: 'Dashboard - Dashboard',
        },
      },
      {
        path: '/kanban',
        name: 'kanban',
        component: KanbanView,
        meta: {
          title: 'Kanban - Kanban',
        },
      },
      {
        path: '/settings/profile',
        name: 'settings.profile',
        component: ProfileView,
        meta: {
          title: 'Profile - Kanban',
        },
      },
      {
        path: '/settings/password',
        name: 'settings.password',
        component: PasswordView,
        meta: {
          title: 'Password - Kanban',
        },
      },
    ],
  },
  {
    meta: {
      guard: ['auth', 'admin'],
    },
    children: [
      {
        path: '/admin',
        name: 'admin.dashboard',
        component: AdminDashboardView,
        meta: {
          title: 'Admin - Kanban',
        },
      },
      {
        path: '/users',
        name: 'admin.users',
        component: UsersView,
        meta: {
          title: 'Users - Kanban',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: '404 Not Found - Kanban',
    },
    props: {
      status: 404,
    },
  },
]
