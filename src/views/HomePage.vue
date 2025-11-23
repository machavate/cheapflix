<template>
  <div>
    <h1>Busca de Filmes</h1>
    <input v-model="title" placeholder="Título do filme" />
    <input v-model="year" placeholder="Ano do filme (ex: 2023)" type="number" />
    <button @click="searchByTitle">Buscar por Título</button>
    <button @click="searchByYear">Buscar por Ano</button>
    <div v-for="movie in movies" :key="movie.id" style="margin: 10px 0;">
      <router-link :to="`/movie/${movie.id}`">
        {{ movie.title }} ({{ movie.release_date ? movie.release_date.substring(0, 4) : 'N/A' }})
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_KEY = 'your_api_key'
const BASE_URL = 'https://api.themoviedb.org/3'

const movies = ref([])
const title = ref('')
const year = ref('')

const loadInitial = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
    movies.value = res.data.results
  } catch (error) {
    console.error('Erro ao carregar filmes iniciais:', error)
  }
}

const searchByTitle = async () => {
  if (!title.value) return
  try {
    const yearParam = year.value ? `&primary_release_year=${year.value}` : ''
    const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${title.value}${yearParam}&language=pt-BR`)
    movies.value = res.data.results
  } catch (error) {
    console.error('Erro na busca por título:', error)
  }
}

const searchByYear = async () => {
  if (!year.value) return
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year.value}&sort_by=popularity.desc&language=pt-BR`)
    movies.value = res.data.results
  } catch (error) {
    console.error('Erro na busca por ano:', error)
  }
}

onMounted(loadInitial)
</script>