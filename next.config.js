/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Reducir el uso de file watchers
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }
    return config
  },
}

module.exports = nextConfig
