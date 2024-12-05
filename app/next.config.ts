import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	images: {
		domains: ["www.thesportsdb.com"],
	},
};

export default nextConfig;
