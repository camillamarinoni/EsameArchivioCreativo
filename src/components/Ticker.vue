<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="h-[55px] overflow-hidden border-t-2 border-b-2 border-fg flex items-center">
    <div class="flex whitespace-nowrap animate-[loop_14s_linear_infinite]">
      <span class="text-[22px] mr-[120px]">{{ text }}</span>
    </div>
  </div>
</template>