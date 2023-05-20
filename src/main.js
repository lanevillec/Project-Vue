import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ProjectPage from './components/ProjectPage.vue'
import AIFactory from './components/AIFactory.vue'
import AboutMe from './components/AboutMe.vue'

// Define your routes
const routes = [
  { path: '/', redirect: '/project-page' },
  { path: '/project-page', component: ProjectPage },
  { path: '/ai-factory', component: AIFactory },
  { path: '/about-me', component: AboutMe },
]

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create the app and mount it
createApp(App).use(router).mount('#app')
