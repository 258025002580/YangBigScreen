<template>
  <div class="dashboard-layout">
    <header class="dash-header">
      <slot name="header" />
    </header>
    <main class="dash-main">
      <aside class="dash-left">
        <slot name="left" />
      </aside>
      <section class="dash-center">
        <slot name="center" />
      </section>
      <aside class="dash-right">
        <slot name="right" />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { theme } from '@/config'
</script>

<style scoped>
.dashboard-layout {
  width: 100vw;
  height: 100vh;
  background: v-bind('theme.bgColor');
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dash-header {
  flex-shrink: 0;
}
.dash-main {
  flex: 1;
  display: flex;
  padding: 0 16px 16px;
  gap: 12px;
  min-height: 0;
}
.dash-left {
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.dash-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.dash-right {
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
