import { ref, computed } from 'vue'

const theme = ref('light')

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  const logoSrc = computed(() =>
    isDark.value ? '/ArchivioCreativo/asset/logowhite.png' : '/ArchivioCreativo/asset/logo.png',
  )

  const toggleSrc = computed(() =>
    isDark.value ? '/ArchivioCreativo/asset/colorwhite.png' : '/ArchivioCreativo/asset/color.png',
  )

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function toggleTheme() {
    theme.value = isDark.value ? 'light' : 'dark'
    applyTheme()
  }

  function initTheme() {
    applyTheme()
  }

  return {
    theme,
    isDark,
    logoSrc,
    toggleSrc,
    toggleTheme,
    initTheme,
  }
}