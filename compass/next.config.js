/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["notioly.com"],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
