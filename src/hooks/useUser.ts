import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/api/User";

export const useUser = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5, 
  });
};
