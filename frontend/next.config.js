/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  assetPrefix:
	process.env.NODE_ENV === 'production'
		? 'https://Turtle-Hwan.github.io/WEB_MiliDream_Dreamers/' : '',
  
  images: {
	loader: 'imgix',
	path: 'https://Turtle-Hwan.github.io/WEB_MiliDream_Dreamers/',
  },
}

module.exports = nextConfig
