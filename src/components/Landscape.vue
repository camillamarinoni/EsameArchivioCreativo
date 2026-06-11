<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRaw,
  watch,
} from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js'

const props = defineProps({
  landscapeData: {
    type: Object,
    required: true,
  },
})

const sceneWrap = ref(null)
const sceneMount = ref(null)
const labelsMount = ref(null)

const state = reactive({
  landscape: null,
  positions: [],
  baseWidth: 28,
  maxHeight: 40,
  peakProportionRatio: 5,
  bumpAmount: 10,
  bumpTerrain: 15,
  noiseSeed: Math.random() * 1000,
  planeSize: 220,
  segments: 192,
})

let terrainGeom
let terrain
let terrainSolid
let labelGroup
let labelObjects = []

let renderer
let labelRenderer
let scene
let camera
let controls
let animationId = 0
let resizeObserver

const defaultCamPos = new THREE.Vector3(140, 110, 170)

function hash2(ix, iz) {
  const s = Math.sin(ix * 12.9898 + iz * 78.233 + state.noiseSeed * 17.31) * 43758.5453
  return (s - Math.floor(s)) * 2 - 1
}

function smooth(t) {
  return t * t * (3 - 2 * t)
}

function valueNoise(x, z) {
  const ix = Math.floor(x)
  const iz = Math.floor(z)
  const fx = x - ix
  const fz = z - iz
  const a = hash2(ix, iz)
  const b = hash2(ix + 1, iz)
  const c = hash2(ix, iz + 1)
  const d = hash2(ix + 1, iz + 1)
  const u = smooth(fx)
  const v = smooth(fz)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

function fbm(x, z) {
  let total = 0, amp = 1, max = 0
  let fx = x * 0.18, fz = z * 0.18
  for (let i = 0; i < 4; i++) {
    total += valueNoise(fx, fz) * amp
    max += amp
    amp *= 0.5
    fx *= 2.07
    fz *= 2.03
  }
  return total / max
}

function fbmTerrain(x, z) {
  let total = 0, amp = 1, max = 0
  let fx = x * 0.048 + 71.17, fz = z * 0.048 - 23.41
  for (let i = 0; i < 3; i++) {
    total += valueNoise(fx, fz) * amp
    max += amp
    amp *= 0.52
    fx *= 2.05
    fz *= 2.02
  }
  return total / max
}

function shufflePositions(items) {
  const radius = state.planeSize * 0.32
  return items.map(() => {
    const a = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random()) * radius
    return {
      x: Math.cos(a) * r,
      z: Math.sin(a) * r,
      widthJitter: 0.75 + Math.random() * 0.5,
      shape: 0.85 + Math.random() * 0.5,
    }
  })
}

function bumpAt(x, z, peaks) {
  let h = 0
  for (const p of peaks) {
    const dx = x - p.x, dz = z - p.z
    const r = Math.sqrt(dx * dx + dz * dz)
    if (r > p.halfWidth) continue
    const t = r / p.halfWidth
    const profile = Math.cos((Math.PI * t) / 2) ** (1.6 * p.shape)
    const local = p.height * profile
    if (local > h) h = local
  }
  return h
}

function buildPeaks() {
  const items = state.landscape.items || []
  const pos = state.positions
  const pr = Math.max(1, Math.min(10, state.peakProportionRatio))
  const alpha = (pr - 1) / 9
  return items.map((item, i) => {
    const p = pos[i] || { x: 0, z: 0, widthJitter: 1, shape: 1 }
    const heightNorm = Math.max(1, Math.min(10, item.height)) / 10
    const baseHalf = (state.baseWidth * p.widthJitter) / 2
    const stretchCoupled = 0.35 + 1.25 * heightNorm
    const stretch = 1 + alpha * (stretchCoupled - 1)
    return {
      name: item.title || item.name || `item ${i + 1}`,
      x: p.x,
      z: p.z,
      halfWidth: baseHalf * stretch,
      height: heightNorm * state.maxHeight,
      shape: p.shape,
    }
  })
}

function rebuildTerrain() {
  if (!terrainGeom) return
  const peaks = buildPeaks()
  const pos = terrainGeom.attributes.position
  const bumpAmt = state.bumpAmount
  const bumpTer = state.bumpTerrain
  const heightRef = Math.max(0.001, state.maxHeight * 0.1)
  const bumpStart = heightRef * 0.35
  const bumpFade = heightRef * 0.55

  const peakMaxY = new Array(peaks.length).fill(0)

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const h = bumpAt(x, z, peaks)
    const factor = h <= bumpStart ? 0 : Math.min(1, (h - bumpStart) / Math.max(0.001, bumpFade - bumpStart))
    const terrainWt = 1 - factor
    const nPeak = fbm(x, z) * bumpAmt * factor
    const nBase = fbmTerrain(x, z) * bumpTer * terrainWt
    const y = Math.max(0, h + nBase + nPeak)
    pos.setY(i, y)

    peaks.forEach((p, pi) => {
      const dx = x - p.x
      const dz = z - p.z
      const r = Math.sqrt(dx * dx + dz * dz)
      if (r < p.halfWidth * 0.3 && y > peakMaxY[pi]) {
        peakMaxY[pi] = y
      }
    })
  }

  pos.needsUpdate = true
  terrainGeom.computeVertexNormals()

  const peaksWithRealY = peaks.map((p, i) => ({
    ...p,
    realY: peakMaxY[i] || p.height,
  }))
  updateLabels(peaksWithRealY)
}

function updateLabels(peaks) {
  if (!labelGroup) return
  for (const obj of labelObjects) {
    labelGroup.remove(obj)
    if (obj.element?.parentNode) obj.element.parentNode.removeChild(obj.element)
  }
  labelObjects = []

  const isMobile = window.innerWidth < 768
  const fontSize = isMobile ? '10px' : '13px'
  const asteriskSize = isMobile ? '10px' : '18px'
  const padding = isMobile ? '2px 5px 2px 3px' : '4px 10px 4px 6px'
  const gap = isMobile ? '3px' : '6px'
  const lineHeight = isMobile ? '15px' : '30px'
  const lineMargin = isMobile ? '6px' : '12px'

  for (const peak of peaks) {
    const wrap = document.createElement('div')
    wrap.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transform: translateX(-14px) translateY(-100%);
    `

    const flag = document.createElement('div')
    flag.style.cssText = `
      display: flex;
      align-items: center;
      gap: ${gap};
      border: 1px solid #000;
      background: #fff;
      padding: ${padding};
      font-family: Inter, sans-serif;
      font-size: ${fontSize};
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #000;
      white-space: nowrap;
    `

    const asterisk = document.createElement('span')
    asterisk.textContent = '*'
    asterisk.style.cssText = `font-size: ${asteriskSize}; font-weight: 900; line-height: 1;`

    const label = document.createElement('span')
    label.textContent = peak.name.toUpperCase()

    flag.appendChild(asterisk)
    flag.appendChild(label)

    const line = document.createElement('div')
    line.style.cssText = `
      width: 2px;
      height: ${lineHeight};
      background: #000;
      margin-left: ${lineMargin};
    `

    wrap.appendChild(flag)
    wrap.appendChild(line)

    const obj = new CSS2DObject(wrap)
    obj.position.set(peak.x, peak.realY, peak.z)
    labelGroup.add(obj)
    labelObjects.push(obj)
  }
}

function cloneLandscapeFromProp(input) {
  return JSON.parse(JSON.stringify(toRaw(input)))
}

function syncLandscapeFromProp() {
  state.landscape = cloneLandscapeFromProp(props.landscapeData)
  state.positions = shufflePositions(state.landscape.items || [])
  if (!terrainGeom) return
  rebuildTerrain()
}

function getViewportSize() {
  const el = sceneWrap.value
  if (!el) return { w: 960, h: 700 }
  return { w: el.clientWidth, h: el.clientHeight }
}

function disposeLabels() {
  if (!labelGroup) { labelObjects = []; return }
  for (const obj of labelObjects) {
    labelGroup.remove(obj)
    if (obj.element?.parentNode) obj.element.parentNode.removeChild(obj.element)
  }
  labelObjects = []
}

function disposeThree() {
  cancelAnimationFrame(animationId)
  animationId = 0
  resizeObserver?.disconnect()
  resizeObserver = undefined
  disposeLabels()
  if (scene && terrain) scene.remove(terrain)
  if (scene && terrainSolid) scene.remove(terrainSolid)
  terrainGeom?.dispose?.()
  terrainGeom = undefined
  terrain?.material?.dispose?.()
  terrain = undefined
  terrainSolid?.material?.dispose?.()
  terrainSolid = undefined
  controls?.dispose?.()
  controls = undefined
  if (renderer?.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  renderer?.dispose?.()
  renderer = undefined
  labelRenderer = undefined
  scene = undefined
  camera = undefined
  labelGroup = undefined
}

function initThree() {
  disposeThree()
  const sceneEl = sceneMount.value
  const labelsEl = labelsMount.value
  if (!sceneEl || !labelsEl) return

  const { w, h } = getViewportSize()

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  sceneEl.appendChild(renderer.domElement)

  labelRenderer = new CSS2DRenderer({ element: labelsEl })
  labelRenderer.setSize(w, h)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 2000)
  camera.position.copy(defaultCamPos)
  camera.lookAt(0, 0, 0)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 60
  controls.maxDistance = 380
  controls.maxPolarAngle = Math.PI / 2.05
  controls.target.set(0, 5, 0)

  terrainGeom = new THREE.PlaneGeometry(
    state.planeSize,
    state.planeSize,
    state.segments,
    state.segments,
  )
  terrainGeom.rotateX(-Math.PI / 2)

  const terrainMatSolid = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.FrontSide,
  })
  terrainSolid = new THREE.Mesh(terrainGeom, terrainMatSolid)
  terrainSolid.position.y = -0.1
  scene.add(terrainSolid)

  const terrainMatWire = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  })
  terrain = new THREE.Mesh(terrainGeom, terrainMatWire)
  scene.add(terrain)

  labelGroup = new THREE.Group()
  scene.add(labelGroup)

  rebuildTerrain()

  function tick() {
    animationId = requestAnimationFrame(tick)
    controls.update()
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
  }
  tick()

  resizeObserver = new ResizeObserver(() => {
    const { w: nw, h: nh } = getViewportSize()
    renderer.setSize(nw, nh)
    labelRenderer.setSize(nw, nh)
    camera.aspect = nw / nh
    camera.updateProjectionMatrix()
  })
  resizeObserver.observe(sceneWrap.value)
}

watch(
  () => props.landscapeData,
  () => syncLandscapeFromProp(),
  { deep: true },
)

onMounted(async () => {
  syncLandscapeFromProp()
  await nextTick()
  initThree()
})

onBeforeUnmount(() => {
  disposeThree()
})
</script>

<template>
  <div class="relative">
    <div
      v-if="state.landscape?.items?.length"
      ref="sceneWrap"
      style="position: relative; width: 100%; height: 60vw; max-height: 80vh; min-height: 300px; background: #fff;"
    >
      <div ref="sceneMount" style="position: absolute; inset: 0;" />
      <div ref="labelsMount" style="pointer-events: none; position: absolute; inset: 0;" />
    </div>
    <p v-else style="padding: 2rem; text-align: center;">
      Landscape JSON missing <code>items</code>.
    </p>
  </div>
</template>