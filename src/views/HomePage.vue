<template>
  <div class="home">
    <header class="header">
      <h1 class="logo">CheapFlix</h1>
      <div class="search-bar">
        <input
          v-model="search"
          @keyup.enter="searchShows"
          placeholder="Buscar séries..."
          class="search-input"
        />
        <button @click="searchShows" class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        <button v-if="search" @click="clearSearch" class="clear-btn">×</button>
      </div>
    </header>

    <main class="main-content">
      <transition-group name="fade" tag="div" class="shows-grid">
        <div
          v-for="show in shows"
          :key="show.id"
          class="show-card"
          @click="$router.push('/show/' + show.id)"
        >
          <div class="poster">
            <img
              v-if="show.image?.medium"
              :src="show.image.medium"
              :alt="show.name"
              loading="lazy"
            />
            <div v-else class="placeholder">
              <span>{{ show.name[0] }}</span>
            </div>
            <div class="overlay">
              <h3>{{ show.name }}</h3>
              <p>{{ show.premiered?.slice(0, 4) || '????' }}</p>
            </div>
          </div>
          <div class="card-info">
            <h4>{{ show.name }}</h4>
            <p class="genres">{{ show.genres?.join(' • ') || 'Sem gênero' }}</p>
          </div>
        </div>
      </transition-group>

      <!-- Skeleton Loading -->
      <div v-if="shows.length === 0" class="shows-grid">
        <div v-for="n in 20" :key="n" class="show-card skeleton">
          <div class="poster skeleton-poster"></div>
          <div class="card-info">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line long"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const shows = ref([])
const search = ref('')

const loadPopular = async () => {
  const res = await axios.get('https://api.tvmaze.com/shows')
  shows.value = res.data.slice(0, 60)
}

const searchShows = async () => {
  if (!search.value.trim()) return loadPopular()
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${search.value}`)
  shows.value = res.data.map(item => item.show)
}

const clearSearch = () => {
  search.value = ''
  loadPopular()
}

onMounted(loadPopular)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Saira+Stencil+One&display=swap');

.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a0d2e 100%);
  color: white;
  font-family: 'Inter', sans-serif;
}

.header {
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
}

.logo {
  font-family: 'Saira Stencil One', cursive;
  font-size: 3.5rem;
  background: linear-gradient(90deg, #e50914, #ff4d4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1.5rem;
}

.search-bar {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 1rem 3.5rem 1rem 1.2rem;
  border-radius: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.search-input::placeholder { color: rgba(255,255,255,0.6); }
.search-input:focus {
  outline: none;
  background: rgba(255,255,255,0.2);
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.4);
}

.search-btn, .clear-btn {
  position: absolute;
  right: 8px;
  background: #e50914;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.clear-btn {
  right: 60px;
  background: rgba(255,255,255,0.2);
  font-size: 1.5rem;
}

.search-btn:hover, .clear-btn:hover { transform: scale(1.1); }

.main-content { padding: 2rem 1rem; }

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.show-card {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(30, 30, 50, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.show-card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 20px 40px rgba(229, 9, 20, 0.3);
}

.poster {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.show-card:hover .poster img { transform: scale(1.1); }

.placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #333, #555);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: bold;
  color: #e50914;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  opacity: 0;
  transition: 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}

.show-card:hover .overlay {
  opacity: 1;
}

.overlay h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-info {
  padding: 1rem;
}

.card-info h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.genres {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Skeleton */
.skeleton-poster {
  height: 300px;
  background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
  background-size: 200%;
  animation: loading 1.5s infinite;
}

.skeleton-line {
  height: 12px;
  background: #333;
  border-radius: 6px;
  margin: 8px 0;
  background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
  background-size: 200%;
  animation: loading 1.5s infinite;
}

.short { width: 60%; }
.long { width: 90%; }

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .logo { font-size: 2.8rem; }
  .search-input { padding: 0.9rem 3rem 0.9rem 1rem; }
  .shows-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
}
</style>