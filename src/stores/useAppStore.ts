import { defineStore } from 'pinia'
import { ref } from 'vue'
import { logger } from '@/utils/logger'

const log = logger.module('AppStore')

/**
 * 应用全局状态
 * 管理主题、刷新间隔等应用级配置
 */
export const useAppStore = defineStore('app', () => {
  const theme = ref<'dark' | 'light'>('dark')
  const refreshInterval = ref(60_000) // 60秒
  const isFullscreen = ref(false)

  function toggleTheme(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    log.info('主题切换', { theme: theme.value })
  }

  function setRefreshInterval(ms: number): void {
    refreshInterval.value = ms
    log.info('刷新间隔更新', { interval: ms })
  }

  function toggleFullscreen(): void {
    isFullscreen.value = !isFullscreen.value
  }

  return {
    theme,
    refreshInterval,
    isFullscreen,
    toggleTheme,
    setRefreshInterval,
    toggleFullscreen,
  }
})
