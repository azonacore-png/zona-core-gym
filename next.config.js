/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/zona-core-gym' : '',
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
