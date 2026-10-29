import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Limit build workers on shared hosting. Use the standard Node.js server.
  experimental: { cpus: 2 },
};

export default nextConfig;
