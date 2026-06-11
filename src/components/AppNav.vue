<script setup>
import { useTheme } from '../composables/useTheme.js'

const { logoSrc, toggleSrc, toggleTheme } = useTheme()

</script>

<template>
  <nav class="navbar">
    <div class="cell logo">
      <img :src="logoSrc" alt="Archivio Creativo">
    </div>

    <RouterLink class="cell" to="/about">ABOUT</RouterLink>
    <RouterLink class="cell" to="/">ARCHIVIO</RouterLink>

    <div class="cell grow"></div>

    <button class="cell" type="button" aria-label="Cambia tema" @click="toggleTheme">
      <img :src="toggleSrc" alt="">
    </button>
  </nav>
</template>