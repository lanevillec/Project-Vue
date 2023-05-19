import { createRouter, createWebHistory } from 'vue-router'
import Projects from './components/Projects.vue'
import AIFactor from './components/AIFactor.vue'
import AboutMe from './components/AboutMe.vue'

const routes = [
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/ai-factor',
    name: 'AIFactor',
    component: AIFactor
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
