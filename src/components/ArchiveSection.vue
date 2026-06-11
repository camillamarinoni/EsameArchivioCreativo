<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { ARCHIVE_WORDS } from '../constants/archiveWords.js'


function selectWord(item) {
  router.push(`/detail/${item.id}`)
}
</script>

<template>
  <section id="archive" class="archive">
    <div class="word-list">
      <button
        v-for="item in ARCHIVE_WORDS"
        :key="item.id"
        type="button"
        class="word"
        @click="selectWord(item)"
      >
        ✱ {{ item.label }}
      </button>
    </div>
  </section>
</template>