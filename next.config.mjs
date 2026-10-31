/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  // The shared preview uses this hostname; this only affects development assets.
  allowedDevOrigins: ["terminal.local"],
  experimental: { cpus: 2 },
  async headers() {
    return [{ source: "/assets/:path*", headers: [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ] }];
  },
};

export default nextConfig;
