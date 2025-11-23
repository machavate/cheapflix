<template>
  <div class="detail-page">
    <button @click="$router.back()" class="back-btn">
      ← Voltar
    </button>

    <div v-if="show" class="hero">
      <div class="backdrop" :style="{ backgroundImage: `url(${show.image?.original || show.image?.medium})` }"></div>
      <div class="hero-content">
        <img :src="show.image?.original || show.image?.medium" :alt="show.name" class="poster-lg" />

        <div class="info">
          <h1>{{ show.name }}</h1>
          <div class="meta">
            <span class="year">{{ show.premiered?.slice(0, 4) || '????' }}</span>
            <span class="rating">★ {{ show.rating.average || 'N/A' }}</span>
            <span class="status" :class="show.status?.toLowerCase()">
              {{ show.status || 'Desconhecido' }}
            </span>
          </div>
          <p class="genres">{{ show.genres?.join(' • ') || 'Sem gênero' }}</p>

          <h2>Sinopse</h2>
          <p v-html="show.summary || 'Sem sinopse disponível.'"></p>

          <div class="actions" v-if="show.officialSite || show.url">
            <a :href="show.officialSite || show.url" target="_blank" class="btn-primary">
              Site Oficial
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">Carregando série...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const show = ref(null)
const route = useRoute()

onMounted(async () => {
  const res = await axios.get(`https://api.tvmaze.com/shows/${route.params.id}`)
  show.value = res.data
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #0f0f0f;
  color: white;
  position: relative;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  padding: 12px 24px;
  background: rgba(229, 9, 20, 0.9);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  transition: 0.3s;
}

.back-btn:hover { background: #ff4d4d; transform: translateY(-3px); }

.backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
  z-index: -1;
}

.hero {
  padding: 120px 5% 60px;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.poster-lg {
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
}

.info h1 {
  font-size: 3.5rem;
  margin: 0 0 1rem;
  background: linear-gradient(90deg, #fff, #ff4d4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

.year, .rating { opacity: 0.9; }
.rating { color: #ffd700; }

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #333;
}

.status.ended { background: #e50914; }
.status.running { background: #28a745; }

.genres {
  font-size: 1.2rem;
  margin: 1.5rem 0;
  opacity: 0.9;
}

.info h2 {
  margin: 2rem 0 1rem;
  color: #e50914;
}

.actions {
  margin-top: 2rem;
}

.btn-primary {
  display: inline-block;
  padding: 14px 32px;
  background: #e50914;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: 0.3s;
  box-shadow: 0 8px 30px rgba(229,9,20,0.4);
}

.btn-primary:hover {
  background: #ff4d4d;
  transform: translateY(-4px);
}

.loading {
  text-align: center;
  padding: 100px;
  font-size: 1.5rem;
}

/* Responsivo */
@media (max-width: 968px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .poster-lg { max-width: 400px; margin: 0 auto; }
  .info h1 { font-size: 2.8rem; }
}
</style>