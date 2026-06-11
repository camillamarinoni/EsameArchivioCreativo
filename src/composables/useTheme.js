import { ref, computed } from 'vue'
import logoLight from '../assets/logo.png'
import logoDark from '../assets/logowhite.png'
import toggleLight from '../assets/color.png'
import toggleDark from '../assets/colorwhite.png'

const theme = ref('light')

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  const logoSrc = computed(() => (isDark.value ? logoDark : logoLight))

  const toggleSrc = computed(() => (isDark.value ? toggleDark : toggleLight))

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