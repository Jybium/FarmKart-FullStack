
/** @type {import('next').NextConfig} */
// const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

//@ts-ignore
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';


const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const headers = [
  {
    key: "Access-Control-Allow-Methods",
    value: "GET, POST, PUT, DELETE, OPTIONS",
  },
  {
    key: "Access-Control-Allow-Headers",
    value: "Content-Type, Authorization",
  },
  {
    key: "Access-Control-Allow-Credentials",
    value: "true",
  },
];


allowedOrigins.forEach((origin) => {
  headers.push({
    key: "Access-Control-Allow-Origin",
    value: origin.trim(), // Trim any whitespace
  });
});


const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neainqsqckknglhdwqdv.supabase.co",
        port: "",
        // pathname: "/storage/v1/object/public",
      },
    ],
  },
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",

        // Headers
        headers
      },
    ];
  },
};



export default nextConfig;


