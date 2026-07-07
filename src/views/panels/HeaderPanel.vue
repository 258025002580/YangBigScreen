<template>
  <TitleBar :title="title" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TitleBar from '@/components/common/TitleBar.vue'
import { useDashboardStore } from '@/stores'

const dashboardStore = useDashboardStore()
const title = computed(() => dashboardStore.dashboardData?.title || '阳的数据大屏')
</script>
