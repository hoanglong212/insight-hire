import { createRouter, createWebHashHistory } from 'vue-router'
import JobOverviewComponent from '../components/JobOverviewComponent.vue'
import JobDetailComponent from '../components/JobDetailComponent.vue'

const routes = [
  {
    path: '/',
    redirect: '/jobs/overview'
  },
  {
    path: '/jobs/overview',
    name: 'job-overview',
    component: JobOverviewComponent
  },
  {
    path: '/jobs/:jobId',
    name: 'job-detail',
    component: JobDetailComponent,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/jobs/overview'
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return false
  }
})

export default router
