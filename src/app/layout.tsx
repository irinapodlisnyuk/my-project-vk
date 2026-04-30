import "./scss/globals.scss";
import type { Metadata } from "next";
import AppHeader from "@/components/Header/AppHeader";
import AntdProvider from "@/components/AppProvider/AppProvider";
import AppFooter from "@/components/Footer/Footer";

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
      <body>
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
