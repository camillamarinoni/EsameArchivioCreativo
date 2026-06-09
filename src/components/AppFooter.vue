<script setup>
import { useTheme } from '../composables/useTheme.js'

const { logoSrc } = useTheme()
</script>

<template>
  <footer class="p-5">
    <div class="text-[clamp(2.5rem,10vw,95px)] font-extrabold leading-[0.95]">
      CAMILLA MARINONI &
      <br>
      SOFIA MANZONI
      <br class="md:hidden">
      <span class="text-[clamp(1.1rem,2vw,18px)] font-normal"> DUE CREATIVE DESIGNER.</span>
    </div>

    <div class="grid grid-cols-[90px_150px_250px] border-2 border-fg mt-5">
      <div class="p-5 border-r-2 border-fg flex items-center justify-center">
        <img :src="logoSrc" alt="Archivio Creativo" class="w-[30px]">
      </div>
      <div class="p-5 border-r-2 border-fg flex items-center justify-center">@2026</div>
      <div class="p-5 border-r-2 border-fg flex items-center justify-center">DIRITTI RISERVATI</div>
    </div>
  </footer>
</template>