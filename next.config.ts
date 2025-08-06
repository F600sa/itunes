import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['is1-ssl.mzstatic.com'],
  },
  async rewrites() {
    return [
      {
        source: '/itunes-api/:path*',
        destination: 'https://itunes.apple.com/:path*',
      },
    ];
  },
};

export default nextConfig;
