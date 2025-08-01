import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve Node.js built-in modules on the client to prevent this error on build
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        fs: false,
        path: false,
        os: false,
        perf_hooks: false
      };
    }
    return config;
  }
};

export default nextConfig;
