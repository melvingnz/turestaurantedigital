# Logging — Tu Restaurante Digital

Sistema centralizado con **Pino**: logs legibles en desarrollo y JSON en producción (Vercel).

## Uso

```ts
import { logger, logError } from '@/lib/logger'
import { getRequestIdFromHeaders } from '@/lib/request-context'

// Mensaje solo
logger.info('Request started')

// Mensaje + metadata (estilo actual)
logger.error('[Auth] signUp failed', { message: err.message, email })

// Metadata primero + mensaje (tracing con requestId)
const requestId = getRequestIdFromHeaders(request.headers)
logger.info({ requestId, route: '/api/example' }, 'Request started')
logger.error(logError(err, { requestId, route: '/api/example' }), 'Request failed')
```

## Configuración

- **LOG_LEVEL**: `debug` | `info` | `warn` | `error` | `silent` (por defecto: `debug` en dev, `info` en prod).
- **DEV**: salida con `pino-pretty` (legible, colores).
- **PROD**: una línea JSON por log (compatible con Vercel Logs y filtros).

Cada log incluye `app` y `env` en la metadata. No uses `console.log` en el proyecto; usar siempre `logger`.

## RequestId (tracing)

- **Route Handlers**: `getRequestIdFromHeaders(request.headers)`.
- **Server Components / Actions**: `await getRequestId()` (usa `headers()` de Next).

Incluir `requestId` en los logs permite seguir una misma petición en Vercel.

## logError(error, context?)

Serializa `Error` (message, name, stack, cause) para que no se pierda en JSON. Uso recomendado en catch:

```ts
logger.error('Request failed', logError(err, { route: '/api/contact' }))
```
