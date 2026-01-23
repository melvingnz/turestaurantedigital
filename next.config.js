/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración de imágenes para Next.js Image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    unoptimized: false,
  },
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
}

module.exports = nextConfig
