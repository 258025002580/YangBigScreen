import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 大屏分辨率自适应 composable
 * 按 1920x1080 设计稿等比缩放
 */
export function useScreenAdapt(designWidth = 1920, designHeight = 1080) {
  const scale = ref(1)
  const screenWidth = ref(designWidth)
  const screenHeight = ref(designHeight)

  function calcScale(): void {
    const w = window.innerWidth
    const h = window.innerHeight
    const scaleX = w / designWidth
    const scaleY = h / designHeight
    scale.value = Math.min(scaleX, scaleY)
    screenWidth.value = w
    screenHeight.value = h
  }

  onMounted(() => {
    calcScale()
    window.addEventListener('resize', calcScale)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', calcScale)
  })

  return {
    scale,
    screenWidth,
    screenHeight,
    transformStyle: () => ({
      transform: `scale(${scale.value})`,
      transformOrigin: 'left top',
      width: `${designWidth}px`,
      height: `${designHeight}px`,
    }),
  }
}
