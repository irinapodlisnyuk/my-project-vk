import { getMovieId } from "@/api/MovieApi";
import { IMovie } from "@/models";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useUser } from "./useUser";

export const useFavoriteMovies = (isEnabled: boolean = true) => {
  const { data: user } = useUser();

  const uniqueFavorites = useMemo(() => {
    return Array.from(new Set(user?.favorites || []));
  }, [user?.favorites]);

  const results = useQueries({
    queries: uniqueFavorites.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => getMovieId(id),
      staleTime: 1000 * 60 * 5,
      enabled: isEnabled, 
    })),
  });

  return {
    favoriteMovies: useMemo(() => 
      results.map((r) => r.data).filter((m): m is IMovie => !!m), 
    [results]),
    
    isLoading: results.some((r) => r.isLoading)
  };
};