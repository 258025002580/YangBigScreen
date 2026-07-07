<template>
  <div class="metric-card">
    <div class="metric-icon" :style="{ color: color }">
      <span>{{ iconChar }}</span>
    </div>
    <div class="metric-info">
      <span class="metric-label">{{ label }}</span>
      <span class="metric-value" :style="{ color }">
        {{ displayValue }}
        <small class="metric-unit">{{ unit }}</small>
      </span>
      <span v-if="trend !== undefined" class="metric-trend" :class="trendClass">
        {{ trend > 0 ? '↑' : trend < 0 ? '↓' : '→' }} {{ Math.abs(trend * 100).toFixed(1) }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '@/utils/format'

const props = defineProps<{
  label: string
  value: number
  unit: string
  color: string
  icon: string
  trend?: number
}>()

const displayValue = computed(() => formatNumber(props.value))

const trendClass = computed(() => {
  if (props.trend === undefined) return ''
  return props.trend > 0 ? 'up' : props.trend < 0 ? 'down' : ''
})

const iconChar = computed(() => {
  const icons: Record<string, string> = {
    eye: '\u{1F441}',
    cart: '\u{1F6D2}',
    user: '\u{1F465}',
    heart: '\u2764',
  }
  return icons[props.icon] || '\u25C9'
})
</script>

<style scoped>
.metric-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(6, 27, 63, 0.6);
  border: 1px solid rgba(0, 180, 255, 0.15);
  border-radius: 6px;
}

.metric-icon {
  font-size: 28px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 180, 255, 0.08);
  border-radius: 8px;
  flex-shrink: 0;
}

.metric-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.metric-label {
  font-size: 12px;
  color: rgba(176, 216, 255, 0.7);
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  font-family: DIN, Arial, monospace;
  line-height: 1.2;
}

.metric-unit {
  font-size: 12px;
  font-weight: 400;
  margin-left: 2px;
  opacity: 0.7;
}

.metric-trend {
  font-size: 11px;
}

.metric-trend.up {
  color: #00e396;
}

.metric-trend.down {
  color: #ff4560;
}
</style>
