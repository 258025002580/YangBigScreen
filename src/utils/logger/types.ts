/** 日志级别 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/** 日志级别名称映射 */
export const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
}

/** 日志条目 */
export interface LogEntry {
  level: LogLevel
  module: string
  message: string
  data?: unknown
  timestamp: number
}

/** 日志输出目标接口 */
export interface ILogTransport {
  log(entry: LogEntry): void
}

/** 日志配置 */
export interface LoggerConfig {
  level: LogLevel
  persist: boolean
}

/** 从环境变量解析日志级别 */
export function parseLogLevel(level: string): LogLevel {
  switch (level) {
    case 'debug':
      return LogLevel.DEBUG
    case 'info':
      return LogLevel.INFO
    case 'warn':
      return LogLevel.WARN
    case 'error':
      return LogLevel.ERROR
    default:
      return LogLevel.DEBUG
  }
}
