import type { ILogTransport, LogEntry, LoggerConfig } from './types'
import { LogLevel, parseLogLevel } from './types'
import { ConsoleTransport } from './transports/ConsoleTransport'
import { StorageTransport } from './transports/StorageTransport'

/**
 * 模块级日志实例
 * 通过 logger.module('ModuleName') 创建，自动携带模块名
 */
export class ModuleLogger {
  private logger: Logger
  private module: string

  constructor(logger: Logger, module: string) {
    this.logger = logger
    this.module = module
  }

  debug(message: string, data?: unknown): void {
    this.logger.log(LogLevel.DEBUG, this.module, message, data)
  }

  info(message: string, data?: unknown): void {
    this.logger.log(LogLevel.INFO, this.module, message, data)
  }

  warn(message: string, data?: unknown): void {
    this.logger.log(LogLevel.WARN, this.module, message, data)
  }

  error(message: string, data?: unknown): void {
    this.logger.log(LogLevel.ERROR, this.module, message, data)
  }
}

/**
 * 日志核心类（单例）
 * 管理日志级别、输出目标
 */
export class Logger {
  private config: LoggerConfig
  private transports: ILogTransport[] = []

  constructor() {
    this.config = {
      level: parseLogLevel(import.meta.env.VITE_LOG_LEVEL || 'debug'),
      persist: import.meta.env.VITE_LOG_PERSIST === 'true',
    }
    this.initTransports()
  }

  private initTransports(): void {
    // 始终添加控制台输出
    this.transports.push(new ConsoleTransport())
    // 仅在启用持久化时添加本地存储
    if (this.config.persist) {
      this.transports.push(new StorageTransport())
    }
  }

  /** 创建模块级日志实例 */
  module(name: string): ModuleLogger {
    return new ModuleLogger(this, name)
  }

  /** 记录日志 */
  log(level: LogLevel, module: string, message: string, data?: unknown): void {
    if (level < this.config.level) return

    const entry: LogEntry = {
      level,
      module,
      message,
      data,
      timestamp: Date.now(),
    }

    for (const transport of this.transports) {
      try {
        transport.log(entry)
      } catch {
        // 单个 Transport 失败不影响其他
      }
    }
  }
}
