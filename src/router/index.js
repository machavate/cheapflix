import { createRouter, createWebHistory } from 'vue-router'
import MovieDetails from '../views/MovieDetails.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/movie/:id', component: MovieDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router