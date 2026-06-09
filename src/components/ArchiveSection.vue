<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { ARCHIVE_WORDS } from '../constants/archiveWords.js'

function selectWord(item) {
  router.push(`/detail/${item.id}`)
}
</script>

<template>
  <section id="archive" class="p-5 min-h-[850px]">
    <div class="flex flex-col gap-[22px]">
      <button
        v-for="item in ARCHIVE_WORDS"
        :key="item.id"
        type="button"
        class="text-[25px] font-extrabold transition-all duration-300 text-left p-0 hover:translate-x-[15px] hover:opacity-50"
        @click="selectWord(item)"
      >
        ✱ {{ item.label }}
      </button>
    </div>
  </section>
</template>