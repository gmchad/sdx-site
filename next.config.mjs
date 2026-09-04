/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Serve the UCSD chapter at ucsd.sdx.community. These must be `beforeFiles`:
    // a plain array is treated as `afterFiles`, which only runs when no page
    // matches, so real routes like `/` and `/events` won the match and the
    // ucsd host served the main site instead of the chapter.
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'ucsd.sdx.community' }],
          destination: '/chapters/ucsd',
        },
        {
          // Map sub-paths under the chapter (e.g. /events, /gallery), but leave
          // Next internals, API routes, generated icons, static files, and
          // already-prefixed /chapters/* paths alone.
          source: '/:path((?!_next/|api/|chapters/|icon$|apple-icon$)(?!.*\\.[^/]+$).*)',
          has: [{ type: 'host', value: 'ucsd.sdx.community' }],
          destination: '/chapters/ucsd/:path',
        },
      ],
    };
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
