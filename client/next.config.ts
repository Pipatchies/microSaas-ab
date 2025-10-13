import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000, // vérifie toutes les secondes
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
