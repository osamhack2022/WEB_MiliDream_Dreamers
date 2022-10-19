const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const isProduction = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = withPlugins([
	[optimizedImages,
		{ imagesPublicPath: '/WEB_MiliDream_Dreamers/' }],
	{
		reactStrictMode: true,
		swcMinify: true,
		async rewrites() {
			return [
				{
					destination: process.env.DESTINATION_URL,
					source: process.env.SOURCE_PATH,
				},
			];
		},
		assetPrefix: isProduction ? 'https://osamhack2022.github.io/WEB_MiliDream_Dreamers/' : '',
		images: {
			loader: 'imgix',
			path: 'https://osamhack2022.github.io/WEB_MiliDream_Dreamers/',
		},
		basePath: '/WEB_MiliDream_Dreamers',
	}
]);

module.exports = nextConfig;
