/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 1. Обязательно для генерации статического HTML на GitHub Pages
  images: {
    unoptimized: true, // 2. Обязательно! Отключает серверную обработку локальных картинок
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