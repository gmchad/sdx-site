/** @type {import('next').NextConfig} */

/** ucsd.sdx.community serves the UCSD chapter routes that live under app/chapters/ucsd. */
const UCSD_HOST = [{ type: 'host', value: 'ucsd.sdx.community' }];

const nextConfig = {
  async rewrites() {
    return [
      // Paths that already carry the chapter prefix pass through unchanged.
      {
        source: '/chapters/ucsd/:path*',
        has: UCSD_HOST,
        destination: '/chapters/ucsd/:path*',
      },
      {
        source: '/',
        has: UCSD_HOST,
        destination: '/chapters/ucsd',
      },
      {
        source: '/:path*',
        has: UCSD_HOST,
        destination: '/chapters/ucsd/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.lu.ma',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.lumacdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '8pd3tfjq1bxzh5qx.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
