/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['riksi.ua', 'localhost'],
    },
    output: 'standalone',
    reactStrictMode: false,
    async rewrites() {
        return [
          {
            source: '/uploads/:path*',
            destination: '/api/uploads/:path*',
          },
        ];
    },
};

export default nextConfig;
