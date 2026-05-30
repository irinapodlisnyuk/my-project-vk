/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cinemaguide.skillbox.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
