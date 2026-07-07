import type { ILogTransport, LogEntry } from '../types'
import { LOG_LEVEL_LABELS } from '../types'

/** 控制台输出 Transport */
export class ConsoleTransport implements ILogTransport {
  log(entry: LogEntry): void {
    const label = LOG_LEVEL_LABELS[entry.level]
    const time = new Date(entry.timestamp).toLocaleTimeString()
    const prefix = `[${time}][${label}][${entry.module}]`

    const args: unknown[] = [prefix, entry.message]
    if (entry.data !== undefined) {
      args.push(entry.data)
    }

    switch (entry.level) {
      case 0: // DEBUG
        // eslint-disable-next-line no-console
        console.debug(...args)
        break
      case 1: // INFO
        // eslint-disable-next-line no-console
        console.info(...args)
        break
      case 2: // WARN
        console.warn(...args)
        break
      case 3: // ERROR
        console.error(...args)
        break
    }
  }
}
