"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const targetPath = urlParams.get("p"); // Ищем строго значение параметра "p"

      if (targetPath) {
        const decodePath = decodeURIComponent(targetPath).replace(
          /~and~/g,
          "&",
        );

        router.replace(`/${decodePath}`);
      }
    }
  }, [router]);

  return null;
}
