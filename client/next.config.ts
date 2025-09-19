import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000, // vérifie toutes les secondes
      aggregateTimeout: 300,
    }
    return config
  },
};

export default nextConfig;
