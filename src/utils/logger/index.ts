import { Logger } from './Logger'

/** 全局日志实例 */
export const logger = new Logger()

export { ModuleLogger, Logger } from './Logger'
export { ConsoleTransport } from './transports/ConsoleTransport'
export { StorageTransport } from './transports/StorageTransport'
export { LogLevel, LOG_LEVEL_LABELS } from './types'
export type { LogEntry, ILogTransport, LoggerConfig } from './types'
