<template>
  <div v-if="movie.id">
    <h1>{{ movie.title }}</h1>
    <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster" style="max-width: 300px;" />
    <p><strong>Ano:</strong> {{ movie.release_date ? movie.release_date.substring(0, 4) : 'N/A' }}</p>
    <p><strong>Sinopse:</strong> {{ movie.overview || 'Não disponível' }}</p>
    <p><strong>Avaliação:</strong> {{ movie.vote_average }} / 10 ({{ movie.vote_count }} votos)</p>
    <p><strong>Gêneros:</strong> {{ movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A' }}</p>
    <router-link to="/">Voltar à lista</router-link>
  </div>
  <div v-else>Carregando...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const API_KEY = 'your_api_key'
const BASE_URL = 'https://api.themoviedb.org/3'

const movie = ref({})
const route = useRoute()

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${route.params.id}?api_key=${API_KEY}&language=pt-BR`)
    movie.value = res.data
  } catch (error) {
    console.error('Erro ao carregar detalhes do filme:', error)
  }
})
</script>