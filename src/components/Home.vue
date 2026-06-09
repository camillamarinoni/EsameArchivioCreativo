<script setup>
import { useRouter } from 'vue-router'
import HeroCanvas from './HeroCanvas.vue'
import Ticker from './Ticker.vue'
import ArchiveSection from './ArchiveSection.vue'

import { TICKER_TEXT } from '../constants/archiveWords.js'

const router = useRouter()

</script>

<template>
  <div class="page-shell">
    <HeroCanvas />
    <Ticker :text="TICKER_TEXT" />
    <ArchiveSection />
    <Ticker :text="TICKER_TEXT" />
  </div>
</template>