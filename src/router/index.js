import { createRouter, createWebHistory } from 'vue-router'
import RecordList from '../views/RecordList.vue'
import NewRecord from '../views/NewRecord.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: RecordList
  },
  {
    path: '/new',
    name: 'new',
    component: NewRecord
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
