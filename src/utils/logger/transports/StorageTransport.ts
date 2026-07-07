import type { ILogTransport, LogEntry } from '../types'

const STORAGE_KEY = 'yang_big_screen_logs'
const MAX_ENTRIES = 500

/** 本地存储持久化 Transport */
export class StorageTransport implements ILogTransport {
  log(entry: LogEntry): void {
    try {
      const logs = this.getLogs()
      logs.push(entry)
      // 超出上限时移除最旧的一半
      if (logs.length > MAX_ENTRIES) {
        logs.splice(0, logs.length - MAX_ENTRIES / 2)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
    } catch {
      // localStorage 不可用时静默失败
    }
  }

  /** 获取所有持久化日志 */
  getLogs(): LogEntry[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  /** 清除持久化日志 */
  clear(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
}
