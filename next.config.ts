/** @type {import('next').NextConfig} */
const nextConfig = {
  // Добавляем эти две строчки (название вашего репозитория с косой чертой)
  basePath: "/my-project-vk",
  assetPrefix: "/my-project-vk/",

  images: {
    qualities: [65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cinemaguide.skillbox.cc",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;