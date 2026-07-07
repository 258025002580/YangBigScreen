import { describe, it, expect, beforeEach } from 'vitest'
import { Logger, ModuleLogger } from '@/utils/logger/Logger'

describe('Logger', () => {
  let logger: Logger

  beforeEach(() => {
    logger = new Logger()
  })

  it('应该创建模块日志实例', () => {
    const log = logger.module('TestModule')
    expect(log).toBeInstanceOf(ModuleLogger)
  })

  it('模块日志应包含模块名', () => {
    const log = logger.module('TestModule')
    // 不抛出异常即通过
    log.info('test message')
    log.debug('debug message', { key: 'value' })
    log.warn('warning')
    log.error('error message')
  })
})
