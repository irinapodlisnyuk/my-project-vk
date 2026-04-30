import { getMovies } from "@/api/MovieApi";
import MoviesList from "@/components/GenrePage/MoviesList/MoviesList";

export default async function MoviesFilter({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const genreKey = decodeURIComponent(name).toLowerCase();


  const allMovies = await getMovies([""]);

  // 2. Фильтруем по жанру и СОРТИРУЕМ ПО РЕЙТИНГУ 
  const filteredMovies = allMovies
    .filter((movie) =>
      movie.genres.some(
        (g) => g.toLowerCase().replace(/[\s-]/g, "") === genreKey,
      ),
    )
    .sort((a, b) => (b.tmdbRating || 0) - (a.tmdbRating || 0));

  return (
    <>
      {filteredMovies.length > 0 ? (
        <MoviesList allMovies={filteredMovies} />
      ) : (
        <p className="genre__wrapper-message">Фильмы в этом жанре не найдены</p>
      )}
    </>
  );
}
