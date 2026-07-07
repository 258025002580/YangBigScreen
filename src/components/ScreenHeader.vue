<template>
  <header class="screen-header">
    <div class="header-left">
      <span class="header-dot"></span>
      <span class="header-subtitle">数据可视化平台</span>
    </div>
    <div class="header-center">
      <h1 class="header-title">
        <span class="title-cn">{{ title }}</span>
        <span class="title-en">RuyiBigScreen</span>
      </h1>
    </div>
    <div class="header-right">
      <span class="header-time">{{ currentTime }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDate } from '@/utils/format'

defineProps<{ title: string }>()

const currentTime = ref(formatDate(new Date()))
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = formatDate(new Date())
  }, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: linear-gradient(180deg, rgba(0, 40, 80, 0.9) 0%, rgba(10, 20, 50, 0.6) 100%);
  border-bottom: 1px solid rgba(0, 180, 255, 0.2);
  flex-shrink: 0;
}

.header-left,
.header-right {
  width: 280px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 10px #00d4ff;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.header-subtitle {
  color: rgba(176, 216, 255, 0.6);
  font-size: 13px;
  letter-spacing: 2px;
}

.header-center {
  text-align: center;
}

.header-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-cn {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 6px;
  text-shadow: 0 0 30px rgba(0, 180, 255, 0.5);
}

.title-en {
  font-size: 11px;
  color: rgba(176, 216, 255, 0.5);
  letter-spacing: 3px;
  margin-top: 2px;
}

.header-right {
  text-align: right;
}

.header-time {
  color: rgba(176, 216, 255, 0.8);
  font-size: 14px;
  font-family: DIN, Arial, monospace;
  letter-spacing: 1px;
}
</style>
