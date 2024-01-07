/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
const nextConfig = {}


module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

module.exports = nextConfig
