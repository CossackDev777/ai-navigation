import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';
import { fileURLToPath } from 'url';
import redirects from './redirects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NEXT_PUBLIC_SERVER_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'], // Use modern formats for better optimization
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3003',
        pathname: '/api/media/file/**',
      },
      ...(NEXT_PUBLIC_SERVER_URL
        ? [
            {
              protocol: 'https', // Ensuring HTTPS
              hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
              pathname: '/**', // Added to ensure coverage of the full path
            },
          ]
        : []),
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  compress: true, // Enable gzip/brotli compression
  redirects,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false }; // Fix Node.js modules in browser
    }
    return config;
  },
};

export default withPayload(nextConfig);
