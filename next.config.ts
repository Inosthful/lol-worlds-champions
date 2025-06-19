/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/lol-worlds-champions" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/lol-worlds-champions/" : "",
};

module.exports = nextConfig;
