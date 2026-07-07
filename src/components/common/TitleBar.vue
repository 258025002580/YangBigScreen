<template>
  <div class="title-bar">
    <div class="title-decoration left"></div>
    <h1 class="title-text">{{ title }}</h1>
    <div class="title-decoration right"></div>
    <div class="title-time">{{ currentTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDate } from '@/utils/format'

withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: '数据大屏',
  },
)

const currentTime = ref(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'))

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.title-bar {
  position: relative;
  text-align: center;
  padding: 16px 0;
  background: linear-gradient(180deg, rgba(0, 180, 255, 0.15) 0%, transparent 100%);
}
.title-text {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 8px;
  margin: 0;
  text-shadow: 0 0 20px rgba(0, 180, 255, 0.5);
}
.title-decoration {
  position: absolute;
  top: 50%;
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.6), transparent);
}
.title-decoration.left {
  left: 10%;
  transform: translateY(-50%);
}
.title-decoration.right {
  right: 10%;
  transform: translateY(-50%) scaleX(-1);
}
.title-time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-top: 4px;
  letter-spacing: 2px;
}
</style>
