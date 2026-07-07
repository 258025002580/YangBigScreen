/**
 * 日志系统
 * 支持 info / warn / error / debug 四级日志
 * 开发环境输出到 console，后续可接入 Sentry 等平台
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  module: string
  message: string
  data?: unknown
  timestamp: number
}

type LogHandler = (entry: LogEntry) => void

const LOG_LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

class Logger {
  private module: string
  private static handlers: LogHandler[] = []
  private static minLevel: LogLevel = 'debug'

  constructor(module: string) {
    this.module = module
  }

  static setLevel(level: LogLevel): void {
    Logger.minLevel = level
  }

  /** 注册自定义日志处理器，方便后续接入 Sentry */
  static addHandler(handler: LogHandler): void {
    Logger.handlers.push(handler)
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (LOG_LEVEL_WEIGHT[level] < LOG_LEVEL_WEIGHT[Logger.minLevel]) return

    const entry: LogEntry = {
      level,
      module: this.module,
      message,
      data,
      timestamp: Date.now(),
    }

    // 开发环境：输出到 console
    /* eslint-disable no-console */
    if (import.meta.env.DEV) {
      const prefix = `[${new Date(entry.timestamp).toLocaleTimeString()}][${level.toUpperCase()}][${this.module}]`

      const fn =
        level === 'error'
          ? console.error
          : level === 'warn'
            ? console.warn
            : level === 'info'
              ? console.info
              : console.debug

      fn(prefix, message, data ?? '')
    }
    /* eslint-enable no-console */

    // 通知所有自定义处理器
    Logger.handlers.forEach((h) => {
      try {
        h(entry)
      } catch {
        // 静默
      }
    })
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data)
  }
  info(message: string, data?: unknown): void {
    this.log('info', message, data)
  }
  warn(message: string, data?: unknown): void {
    this.log('warn', message, data)
  }
  error(message: string, data?: unknown): void {
    this.log('error', message, data)
  }
}

/** 创建模块级 Logger */
export function createLogger(module: string): Logger {
  return new Logger(module)
}

export { Logger }
export type { LogLevel, LogEntry, LogHandler }
