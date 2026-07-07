/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE: 'mock' | 'api'
  readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
  readonly VITE_LOG_PERSIST: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
