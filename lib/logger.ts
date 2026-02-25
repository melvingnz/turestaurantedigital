/**
 * Logger centralizado (Pino).
 * - DEV: logs legibles con pino-pretty.
 * - PROD (Vercel): JSON estructurado para observabilidad.
 * Nivel por LOG_LEVEL (debug | info | warn | error | silent). No usar console.log en el proyecto.
 */

import pino from 'pino'

const APP_NAME = 'turestaurantedigital'
const isDev = process.env.NODE_ENV === 'development'

function getLevel(): string {
  const v = process.env.LOG_LEVEL?.toLowerCase().trim()
  if (v === 'debug' || v === 'info' || v === 'warn' || v === 'error' || v === 'silent') return v
  return isDev ? 'debug' : 'info'
}

const base = {
  app: APP_NAME,
  env: process.env.NODE_ENV ?? 'development',
}

function createPino(): pino.Logger {
  const opts: pino.LoggerOptions = {
    level: getLevel(),
    base,
    serializers: {
      err: pino.stdSerializers.err,
      error: pino.stdSerializers.err,
    },
  }

  if (isDev) {
    return pino({
      ...opts,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    })
  }

  return pino(opts)
}

const pinoLogger = createPino()

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x) && !(x instanceof Error)
}

function normalizePayload(data: unknown): Record<string, unknown> {
  if (data instanceof Error) {
    return {
      err: {
        message: data.message,
        name: data.name,
        stack: data.stack,
        cause: data.cause,
      },
    }
  }
  if (isRecord(data)) return data
  if (data !== undefined && data !== null) return { data }
  return {}
}

function bindLog(level: 'debug' | 'info' | 'warn' | 'error') {
  const fn = (a: string | Record<string, unknown>, b?: string | unknown) => {
    let msg: string
    let payload: Record<string, unknown> = {}

    if (typeof a === 'string' && b === undefined) {
      msg = a
    } else if (typeof a === 'string' && b !== undefined) {
      msg = a
      payload = normalizePayload(b)
    } else if (isRecord(a) && typeof b === 'string') {
      payload = a
      msg = b
    } else {
      msg = typeof a === 'string' ? a : String(a)
    }

    if (Object.keys(payload).length > 0) {
      pinoLogger[level](payload, msg)
    } else {
      ;(pinoLogger[level] as (msg: string) => void)(msg)
    }
  }
  return fn
}

export const logger = {
  debug: bindLog('debug'),
  info: bindLog('info'),
  warn: bindLog('warn'),
  error: bindLog('error'),
  child: (bindings: Record<string, unknown>) => pinoLogger.child(bindings),
}

/**
 * Serializa errores para logs (message, name, stack, cause).
 * Uso: logger.error('Request failed', logError(err, { route: '/api/example' }))
 * O:   logger.error(logError(err, { requestId }), 'Request failed')
 */
export function logError(
  error: unknown,
  context?: Record<string, unknown>
): Record<string, unknown> {
  const err = error instanceof Error
    ? {
        message: error.message,
        name: error.name,
        stack: error.stack,
        ...(error.cause !== undefined && { cause: error.cause }),
      }
    : { message: String(error) }
  return {
    ...context,
    err,
  }
}
