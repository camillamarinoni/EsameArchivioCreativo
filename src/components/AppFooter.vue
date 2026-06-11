<script setup>
import { useTheme } from '../composables/useTheme.js'

const { logoSrc } = useTheme()
</script>

<template>
  <footer>
    <div class="footerTitle">
      CAMILLA MARINONI &
      <br>
      SOFIA MANZONI
      <span> DUE CREATIVE DESIGNER.</span>
    </div>

    <div class="footerBottom">
      <div>
        <img :src="logoSrc" alt="Archivio Creativo">
      </div>
      <div>@2026</div>
      <div>DIRITTI RISERVATI</div>
    </div>
  </footer>
</template>