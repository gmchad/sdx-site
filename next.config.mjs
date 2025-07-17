/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.lu.ma',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
