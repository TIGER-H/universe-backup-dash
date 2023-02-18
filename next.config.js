/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2nmfrc2pe2bsk.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
