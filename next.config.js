/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/zona-core-gym',
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
