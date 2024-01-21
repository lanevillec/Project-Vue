import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ProjectPage from './components/ProjectPage.vue'
import AIFactory from './components/AIFactory.vue'
import AboutMe from './components/AboutMe.vue'

// Import Font Awesome library and components
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(faDownload)

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

// Create the app, register FontAwesomeIcon globally, and mount it
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router).mount('#app')
