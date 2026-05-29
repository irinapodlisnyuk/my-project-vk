"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = window.location.search;
      // Проверяем, пришли ли мы со страницы public/404.html
      if (query && query.indexOf("p=") > -1) {
        const match = query.match(/p=([^&]*)/);
        if (match && match[1]) {
          const decodePath = decodeURIComponent(match[1]).replace(/~and~/g, "&");
          // Мгновенно перенаправляем внутренний роутер Next.js на нужный фильм
          router.replace(`/${decodePath}`);
        }
      }
    }
  }, [router]);

  return null;
}