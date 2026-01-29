/**
 * Server-side logger: timestamp + level (INFO | WARN | DEBUG | ERROR) + message.
 * Use LOG_LEVEL=debug|info|warn|error|silent to control verbosity (default: info in prod, debug in dev).
 * silent = no logs emitted.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'
type ConfigLevel = LogLevel | 'silent'

const ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

function minLevel(): ConfigLevel {
  const v = process.env.LOG_LEVEL?.toLowerCase().trim()
  if (v === 'debug' || v === 'info' || v === 'warn' || v === 'error' || v === 'silent') return v
  return process.env.NODE_ENV === 'development' ? 'debug' : 'info'
}

function timestamp(): string {
  return new Date().toISOString()
}

function serializePayload(data: unknown): string {
  if (data === undefined) return ''
  if (data instanceof Error) {
    const obj: Record<string, unknown> = { message: data.message, name: data.name }
    if (data.cause !== undefined) obj.cause = data.cause
    if (process.env.NODE_ENV === 'development' && data.stack) obj.stack = data.stack
    return ' ' + JSON.stringify(obj)
  }
  return ' ' + JSON.stringify(data)
}

function emit(level: LogLevel, message: string, data?: unknown): void {
  const min = minLevel()
  if (min === 'silent') return
  if (ORDER[level] < ORDER[min as LogLevel]) return
  const ts = timestamp()
  const tag = `|${level.toUpperCase()}|`
  const payload = serializePayload(data)
  const line = `${ts}  ${tag} - ${message}${payload}`

  switch (level) {
    case 'error':
      process.stderr.write(line + '\n')
      break
    case 'warn':
      process.stderr.write(line + '\n')
      break
    default:
      process.stdout.write(line + '\n')
  }
}

export const logger = {
  debug: (message: string, data?: unknown) => emit('debug', message, data),
  info: (message: string, data?: unknown) => emit('info', message, data),
  warn: (message: string, data?: unknown) => emit('warn', message, data),
  error: (message: string, data?: unknown) => emit('error', message, data),
}
