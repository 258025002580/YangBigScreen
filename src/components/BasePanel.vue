<template>
  <div class="base-panel">
    <div class="panel-header">
      <span class="panel-dot"></span>
      <span class="panel-title">{{ title }}</span>
      <slot name="header-right" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.base-panel {
  background: rgba(6, 27, 63, 0.75);
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
  gap: 8px;
}

.panel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 6px #00d4ff;
}

.panel-title {
  color: #b0d8ff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}

.panel-body {
  flex: 1;
  padding: 8px;
  min-height: 0;
  overflow: hidden;
}
</style>
