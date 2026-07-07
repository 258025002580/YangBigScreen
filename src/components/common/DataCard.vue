<template>
  <div class="data-card" :style="cardStyle">
    <div class="card-header">
      <span class="card-title">{{ title }}</span>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme } from '@/config'

const props = withDefaults(
  defineProps<{
    title: string
    height?: string
  }>(),
  {
    height: '100%',
  },
)

const cardStyle = computed(() => ({
  height: props.height,
  background: theme.panelBgColor,
  borderColor: theme.panelBorderColor,
}))
</script>

<style scoped>
.data-card {
  border: 1px solid;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.card-header {
  flex-shrink: 0;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid v-bind('theme.panelBorderColor');
}
.card-title {
  color: v-bind('theme.titleColor');
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  padding-left: 12px;
}
.card-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 14px;
  background: v-bind('theme.primaryColor');
  border-radius: 2px;
}
.card-body {
  flex: 1;
  min-height: 0;
}
</style>
