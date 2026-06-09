<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Landscape from './Landscape.vue'
import Ticker from './Ticker.vue'
import AppFooter from './AppFooter.vue'
import { TICKER_TEXT } from '../constants/archiveWords.js'

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
  <div class="fixed inset-0 bg-bg z-[999] overflow-y-auto">
    <div v-if="data">
      <div class="pt-12 px-6 max-w-[1200px] mx-auto pb-12">
        <h1 class="mb-6 text-[clamp(2rem,6vw,4.5rem)] uppercase">{{ data.name }}</h1>
        <p v-if="loading" class="mb-6 text-[0.9rem]">Caricamento in corso...</p>
        <p v-else-if="error" class="mb-6 text-[0.9rem]">{{ error }}</p>
        <Landscape v-else :landscapeData="data" />
        <button type="button" class="mt-8 border-2 border-fg px-[30px] py-3" @click="goBack">
          Torna all'archivio
        </button>
      </div>

      <Ticker :text="TICKER_TEXT" />
      <AppFooter />
    </div>
  </div>
</template>