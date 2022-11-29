/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	images: {
		domains: ["localhost"],
		formats: ["image/avif", "image/webp"],
	},
};

module.exports = nextConfig;
