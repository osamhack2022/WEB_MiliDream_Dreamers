/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  assetPrefix:
	process.env.NODE_ENV === 'production'
		? 'https://osamhack2022.github.io/WEB_MiliDream_Dreamers/' : '',
  
  images: {
	loader: 'imgix',
	path: 'https://osamhack2022.github.io/WEB_MiliDream_Dreamers/',
  },
}

module.exports = nextConfig
