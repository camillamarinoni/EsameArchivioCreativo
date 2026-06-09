<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from './composables/useTheme.js'

import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'

const { initTheme } = useTheme()
const route = useRoute()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <AppNav />
  <RouterView />
  <AppFooter v-if="route.name !== 'detail'" />
</template>