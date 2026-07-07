/** 大屏自适应缩放工具 */

export interface ResizeConfig {
  designWidth: number
  designHeight: number
}

export function calcScreenScale(config: ResizeConfig = { designWidth: 1920, designHeight: 1080 }): number {
  const w = window.innerWidth / config.designWidth
  const h = window.innerHeight / config.designHeight
  return Math.min(w, h)
}

export function onScreenResize(callback: (scale: number) => void, config?: ResizeConfig): () => void {
  const handler = () => callback(calcScreenScale(config))
  window.addEventListener('resize', handler)
  handler()
  return () => window.removeEventListener('resize', handler)
}
