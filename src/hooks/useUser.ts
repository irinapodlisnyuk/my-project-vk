import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/api/User";
import { useRouter } from "next/navigation";

export const useUser = () => {
  
  const query = useQuery({
    queryKey: ["users", "me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5, 
  });

  const router = useRouter();
  const { data, isSuccess, isFetching, error } = query;

  useEffect(() => {
    // Если сервер ответил ошибкой (например, 401) или прислал пустой профиль
    if ((error || (isSuccess && !data)) && !isFetching) {
      if (typeof window !== 'undefined' && window.location.pathname === "/account") {
        router.push("/"); // Выкидываем неавторизованного пользователя из ЛК
      }
    }
  }, [data, isSuccess, isFetching, error, router]);

  return query;
  
};


