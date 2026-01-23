/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deshabilitar proxy durante desarrollo para permitir Google Fonts
  async headers() {
    return []
  },
  // Optimizar file watchers para evitar EMFILE
  webpack: (config, { isServer, dev }) => {
    if (dev && !isServer) {
      // Usar polling en lugar de file watching para evitar EMFILE
      config.watchOptions = {
        poll: 2000, // Poll cada 2 segundos
        aggregateTimeout: 500,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/public/**',
          '**/.env*',
          '**/dist/**',
          '**/build/**',
          '**/*.log',
        ],
      }
    }
    return config
  },
  // Deshabilitar file watching para archivos estáticos
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configuración para evitar errores de tracing en Vercel
  outputFileTracingIncludes: {
    '/*': ['./public/**/*'],
  },
}

module.exports = nextConfig
