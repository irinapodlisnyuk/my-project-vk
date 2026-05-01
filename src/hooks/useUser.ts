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
  const { data, isSuccess, isFetching } = query;

  useEffect(() => {
    if (isSuccess && data === null && !isFetching) {
      if (window.location.pathname === "/account") {
        router.push("/");
      }
    }
  }, [data, isSuccess, isFetching, router]);

  return query;
};
