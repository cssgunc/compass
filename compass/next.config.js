/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "notioly.com",
            },
        ],
    },
};

module.exports = nextConfig;
