/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Root → default locale. A config-level redirect is emitted by the edge
      // as a clean 308 with a Location header (crawler-safe), unlike a runtime
      // redirect() in a Server Component, which Vercel can cache without one.
      { source: '/', destination: '/en', permanent: true },
    ]
  },
}

export default nextConfig
