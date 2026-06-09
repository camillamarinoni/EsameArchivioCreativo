<script setup>
import { ref } from 'vue'
import { useHeroCanvas } from '../composables/useHeroCanvas'

const canvasRef = ref(null)

useHeroCanvas(canvasRef)
</script>

<template>
  <section class="h-[80vh] flex items-center justify-center py-20 overflow-visible">
    <canvas ref="canvasRef"></canvas>
  </section>
</template>