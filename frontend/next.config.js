/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
          destination: process.env.DESTINATION_URL,
          source: process.env.SOURCE_PATH,
      },
  ];
  }
}

module.exports = nextConfig
