/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
}

module.exports = nextConfig
