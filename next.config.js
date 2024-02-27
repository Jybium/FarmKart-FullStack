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

  images: {
     domains: ['neainqsqckknglhdwqdv.supabase.co'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neainqsqckknglhdwqdv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/",
        domains: ["neainqsqckknglhdwqdv.supabase.co"],
      },
    ],
  },
};

module.exports = nextConfig
