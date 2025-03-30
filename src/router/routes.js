import HomeView from '@/views/HomeView.vue'

const DashboardView = () => import('../views/DashboardView.vue')
const KanbanView = () => import('../views/KanbanView.vue')
const LoginView = () => import('../views/LoginView.vue')
const AdminDashboardView = () => import('../views/admin/DashboardView.vue')
const UsersView = () => import('../views/admin/UsersView.vue')
const NotFoundView = () => import('../views/ErrorView.vue')

export default [
  {
    path: '/',
    name: 'home',
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
      },
      {
        path: '/kanban',
        name: 'kanban',
        component: KanbanView,
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
      },
      {
        path: '/users',
        name: 'admin.users',
        component: UsersView,
      },
    ],
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
