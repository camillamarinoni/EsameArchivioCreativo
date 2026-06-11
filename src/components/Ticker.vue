<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="ticker">
    <div class="ticker-track">
      <span>{{ text }}</span>
    </div>
  </div>
</template>