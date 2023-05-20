import { createRouter, createWebHistory } from 'vue-router'
import ProjectPage from './components/ProjectPage.vue'
import AIFactory from './components/AIFactory.vue'
import AboutMe from './components/AboutMe.vue'

const routes = [
  {
    path: '/project-page',
    name: 'ProjectPage',
    component: ProjectPage
  },
  {
    path: '/ai-factory',
    name: 'AIFactory',
    component: AIFactory
  },
  {
    path: '/about-me',
    name: 'AboutMe',
    component: AboutMe
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
