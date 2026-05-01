import "./scss/globals.scss";
import type { Metadata } from "next";
import AppHeader from "@/components/Header/AppHeader";
import AntdProvider from "@/components/AppProvider/AppProvider";
import AppFooter from "@/components/Footer/Footer";
import localFont from "next/font/local";

const playFont = localFont({
  src: [
    { path: "../../public/fonts/play.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/play-bold.woff2", weight: "700", style: "normal" },
  ],
   variable: "--font-play",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg", 
  },
  title: "VK Маруся — Смотреть фильмы онлайн",
  description: "Кинотеатр VK Маруся: топ 10 фильмов, жанры и удобный поиск",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${playFont.variable}`}>
        <AntdProvider>
          <div className="root-wrapper">
            <AppHeader />
            <main>{children}</main>
            <AppFooter />
          </div>
        </AntdProvider>
      </body>
    </html>
  );
}

