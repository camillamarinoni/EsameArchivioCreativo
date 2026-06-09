import { onMounted, onUnmounted } from 'vue'

const L1 = 'Archivio Creativo'
const L2 = 'Del Digital Design Culturale'
const L3 = '22 Mag 2026'
const N_AXES = 3
const PERIOD = 2800

function getColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark'
  return {
    bg: dark ? '#000000' : '#ffffff',
    fg: dark ? '#ffffff' : '#000000',
  }
}

export function useHeroCanvas(canvasRef) {
  let ctx
  let animationId
  let W
  let H
  let FS
  let INNER_R
  let LINE_H

  function font(size) {
    return `800 ${size}px Inter`
  }

  function measureW(text, size) {
    ctx.font = font(size)
    return ctx.measureText(text).width
  }

  function resize() {
    const canvas = canvasRef.value
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.68

    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    canvas.width = size * dpr
    canvas.height = size * dpr

    W = H = size
    FS = size * 0.03
    INNER_R = size * 0.065
    LINE_H = FS * 1.28

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function draw(ts) {
    const { bg, fg } = getColors()

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    const fs2 = FS
    const fs1 = FS * 0.78
    const fs3 = FS * 0.78

    const w2 = measureW(L2, fs2)
    const w1 = measureW(L1, fs1)
    const w3 = measureW(L3, fs3)

    const t = (ts % PERIOD) / PERIOD
    const osc = (1 - Math.cos(t * Math.PI * 2)) / 2
    const osc2 = 1 - osc

    const slide1 = Math.max(0, w2 - w1) * osc
    const slide3 = Math.max(0, w2 - w3) * osc2
    const blockH = LINE_H * 2 + fs3

    ctx.textBaseline = 'top'

    for (let i = 0; i < N_AXES; i++) {
      const angle = (Math.PI / N_AXES) * i - Math.PI / 2

      for (let side = 0; side < 2; side++) {
        ctx.save()
        ctx.translate(W / 2, H / 2)
        ctx.rotate(angle + side * Math.PI)

        const yOff = -blockH / 2

        ctx.font = font(fs1)
        ctx.fillStyle = fg
        ctx.fillText(L1, INNER_R + slide1, yOff)

        ctx.font = font(fs2)
        ctx.fillText(L2, INNER_R, yOff + LINE_H)

        ctx.font = font(fs3)
        ctx.fillText(L3, INNER_R + slide3, yOff + LINE_H * 2)

        ctx.restore()
      }
    }

    animationId = requestAnimationFrame(draw)
  }

  function startAnimation() {
    document.fonts.ready.then(() => {
      animationId = requestAnimationFrame(draw)
    })
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    ctx = canvas.getContext('2d')
    resize()
    window.addEventListener('resize', resize)
    startAnimation()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  })
}