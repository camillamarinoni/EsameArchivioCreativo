<script setup>
import { useTheme } from '../composables/useTheme.js'

const { logoSrc, toggleSrc, toggleTheme } = useTheme()
</script>

<template>
  <nav class="grid grid-cols-[90px_150px_180px_1fr_90px] h-16 border-2 border-fg">
    <div class="flex items-center justify-center border-r-2 border-fg">
      <img :src="logoSrc" alt="Archivio Creativo" class="w-[35px]">
    </div>
    <RouterLink class="flex items-center justify-center border-r-2 border-fg" to="/about">ABOUT</RouterLink>
    <RouterLink class="flex items-center justify-center border-r-2 border-fg" to="/">ARCHIVIO</RouterLink>
    <div class="flex-1 border-r-2 border-fg"></div>
    <button class="flex items-center justify-center border-r-2 border-fg" type="button" aria-label="Cambia tema" @click="toggleTheme">
      <img :src="toggleSrc" alt="" class="w-[34px]">
    </button>
  </nav>
</template>