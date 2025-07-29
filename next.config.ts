import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '93.115.21.155',
        port: '', 
        pathname: '/**', 
      },
      // {
      //   protocol: 'https',
      //   hostname: '93.115.21.155',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  }
};

export default nextConfig;
