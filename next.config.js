/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		googleAnalyticsID: "UA-211037558-1",
	},
	reactStrictMode: true,
	swcMinify: true,
};

const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM({});

module.exports = nextConfig;
