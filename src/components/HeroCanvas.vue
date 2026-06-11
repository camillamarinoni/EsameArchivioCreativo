<script setup>
import { ref } from 'vue'
import { useHeroCanvas } from '../composables/useHeroCanvas'

const canvasRef = ref(null)

useHeroCanvas(canvasRef)
</script>

<template>
  <section class="hero">
    <canvas ref="canvasRef"></canvas>
  </section>
</template>