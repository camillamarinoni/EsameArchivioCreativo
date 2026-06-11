<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Landscape from './Landscape.vue'
import AppFooter from './AppFooter.vue'

const route = useRoute()
const router = useRouter()

const data = ref(null)
const loading = ref(false)
const error = ref('')

async function loadData() {
  const id = route.params.id
  try {
    loading.value = true
    const response = await fetch(`${import.meta.env.BASE_URL}data/${id}.json`)
    if (!response.ok) throw new Error('File dati non trovato')
    data.value = await response.json()
  } catch (loadError) {
    data.value = null
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="detail-shell">
    <main class="page" v-if="data">
      <div class="content">
        <h1>{{ data.name }}</h1>
        <p v-if="loading">Caricamento in corso...</p>
        <p v-else-if="error">{{ error }}</p>
        <Landscape v-else-if="data" :landscapeData="data" />
        <button type="button" class="close" @click="goBack">
          Torna all'archivio
        </button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
