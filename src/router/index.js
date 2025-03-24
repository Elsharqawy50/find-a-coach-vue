import CoachesPage from '@/pages/coaches/CoachesPage.vue'
import NotFound from '@/pages/NotFound.vue'
import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'

const AuthPage = () => import('@/pages/auth/AuthPage.vue')
const CoachDetailsPage = () => import('@/pages/coaches/CoachDetailsPage.vue')
const CoachRegisterPage = () => import('@/pages/coaches/CoachRegisterPage.vue')
const ContactCoachPage = () => import('@/pages/coaches/ContactCoachPage.vue')
const RequestsPage = () => import('@/pages/requests/RequestsPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesPage },
    {
      path: '/coaches/:id',
      component: CoachDetailsPage,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoachPage,
          props: true,
        },
      ],
    },
    { path: '/register', component: CoachRegisterPage, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsPage, meta: { requiresAuth: true } },
    { path: '/auth', component: AuthPage, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
