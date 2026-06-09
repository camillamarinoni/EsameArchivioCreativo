<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  closeLabel: {
    type: String,
    default: 'CHIUDI',
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <section v-if="visible" class="page">
      <div class="content">
        <h1>{{ title }}</h1>
        <p>Inserirai contenuti qui</p>
        <button type="button" class="close" @click="emit('close')">
          {{ closeLabel }}
        </button>
      </div>
    </section>
  </Teleport>
</template>
