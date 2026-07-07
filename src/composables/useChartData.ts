import { ref, type Ref } from 'vue'
import type { ChartData, ChartProps } from '@/types/chart'
import { chartService } from '@/services'
import { logger } from '@/utils/logger'

const log = logger.module('useChartData')

/**
 * 图表数据获取 composable
 * 封装单个图表的数据加载、loading、error 状态
 */
export function useChartData(chartId: string) {
  const data: Ref<ChartData | null> = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function fetchData(): Promise<void> {
    loading.value = true
    error.value = ''
    try {
      const response = await chartService.fetchChartData(chartId)
      if (response.code === 200) {
        data.value = response.data
      } else {
        error.value = response.message
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '数据获取失败'
      log.error(`获取图表数据失败 [${chartId}]`, { error: msg })
      error.value = msg
    } finally {
      loading.value = false
    }
  }

  /** 转换为 ChartProps，可直接传给图表组件 */
  function toChartProps(): ChartProps {
    return {
      data: data.value || ({} as ChartData),
      loading: loading.value,
      error: error.value,
    }
  }

  return {
    data,
    loading,
    error,
    fetchData,
    toChartProps,
  }
}
