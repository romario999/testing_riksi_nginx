/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['riksi.ua', 'localhost', 'www.facebook.com'],
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
