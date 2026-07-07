<template>
  <span class="number-flop" :style="{ color: color, fontSize: fontSize + 'px' }">
    {{ displayValue }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { formatNumber } from '@/utils/format'

const props = withDefaults(
  defineProps<{
    value: number
    decimals?: number
    prefix?: string
    suffix?: string
    color?: string
    fontSize?: number
    duration?: number
  }>(),
  {
    decimals: 0,
    prefix: '',
    suffix: '',
    color: '#00b4ff',
    fontSize: 32,
    duration: 1000,
  },
)

const displayValue = ref('')

function animateValue(from: number, to: number): void {
  const start = performance.now()
  const range = to - from

  function step(timestamp: number) {
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / props.duration, 1)
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = from + range * eased
    displayValue.value = `${props.prefix}${formatNumber(current, props.decimals)}${props.suffix}`
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  displayValue.value = `${props.prefix}${formatNumber(props.value, props.decimals)}${props.suffix}`
})

watch(
  () => props.value,
  (newVal, oldVal) => {
    animateValue(oldVal || 0, newVal)
  },
)
</script>

<style scoped>
.number-flop {
  font-family: 'DIN', 'Arial', monospace;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>
