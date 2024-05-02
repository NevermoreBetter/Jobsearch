/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  domains: ["images.clerk.dev"],
 },
 webpack: (config, options) => {
  config.externals = config.externals || {};
  config.externals["@edgestore/server"] = "@edgestore/server";
  return config;
 },
};

export default nextConfig;
