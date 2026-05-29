import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/api/User";
import { useRouter } from "next/navigation";

export const useUser = () => {
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  //  проверка: токен существует, он не равен тексту "undefined" или "null" и он не пустой
  const hasToken = !!token && token !== "undefined" && token !== "null" && token.trim() !== "";

  const query = useQuery({
    queryKey: ["users", "me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: hasToken, 
  });

  const router = useRouter();
  const { data, isSuccess, isFetching, error } = query;

  useEffect(() => {
    if ((error || (isSuccess && !data)) && !isFetching) {
      if (typeof window !== 'undefined' && window.location.pathname === "/account") {
        router.push("/");
      }
    }
  }, [data, isSuccess, isFetching, error, router]);

return query;
  
};


