/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  basePath: '/my-project-vk', 
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