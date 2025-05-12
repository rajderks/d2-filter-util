import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      '*.txt': {
        loaders: ['raw-loader'],
        as: 'string'
      }
    }
  },
};

export default nextConfig;
