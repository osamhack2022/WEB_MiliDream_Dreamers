/** next-images module 가져오기 */
const withImages = require('next-images');
module.exports = withImages();

const isProduction = process.env.NODE_ENV === 'production';
const isGhPage = process.env.DEPLOY_METHOD === 'gh-page';
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	async rewrites() {
		return [
			{
				destination: process.env.DESTINATION_URL,
				source: process.env.SOURCE_PATH,
			},
		];
	},
	assetPrefix: isGhPage ? 'https://osamhack2022.github.io/WEB_MiliDream_Dreamers/' : undefined,

	images: isGhPage ? {
		loader: 'imgix',
		path: 'https://osamhack2022.github.io/WEB_MiliDream_Dreamers/',
	} : undefined,
	basePath: isGhPage ? '/WEB_MiliDream_Dreamers' : ''
}

module.exports = nextConfig
