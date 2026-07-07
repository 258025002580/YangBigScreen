<template>
  <div class="big-screen" :style="screenStyle">
    <div class="screen-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scale = ref(1)

function updateScale() {
  const w = window.innerWidth / 1920
  const h = window.innerHeight / 1080
  scale.value = Math.min(w, h)
}

const screenStyle = computed(() => ({
  width: '1920px',
  height: '1080px',
  transform: `scale(${scale.value})`,
  transformOrigin: 'left top',
}))

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped>
.big-screen {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  background: #0a1432;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  color: #e0f0ff;
}

.screen-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
