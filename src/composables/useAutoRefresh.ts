import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { AUTO_REFRESH_INTERVAL } from '@/config'
import { logger } from '@/utils/logger'

const log = logger.module('useAutoRefresh')

/**
 * 自动刷新 composable
 * 定时调用数据刷新回调
 */
export function useAutoRefresh(refreshFn: () => Promise<void>, interval = AUTO_REFRESH_INTERVAL) {
  const isRefreshing = ref(false)
  const lastRefreshTime: Ref<string | null> = ref(null)

  let timer: ReturnType<typeof setInterval> | null = null

  async function refresh(): Promise<void> {
    if (isRefreshing.value) return
    isRefreshing.value = true
    try {
      await refreshFn()
      lastRefreshTime.value = new Date().toLocaleTimeString()
      log.debug('数据自动刷新完成')
    } catch (err) {
      log.error('自动刷新失败', { error: err })
    } finally {
      isRefreshing.value = false
    }
  }

  function start(): void {
    stop()
    timer = setInterval(refresh, interval)
    log.info(`自动刷新已启动，间隔 ${interval}ms`)
  }

  function stop(): void {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(() => start())
  onUnmounted(() => stop())

  return {
    isRefreshing,
    lastRefreshTime,
    refresh,
    start,
    stop,
  }
}
