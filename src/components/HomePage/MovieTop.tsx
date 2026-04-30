import { getMovieTop } from "@/api/MovieApi";
import MovieTopClient from "./MovieTopClient";

export default async function MovieTop() {
  const movieTop = await getMovieTop();

  return (
    <section className="movie-top">
      <div className="container">
        <h2 className="movie-top__header">Топ 10 фильмов</h2>
        <MovieTopClient movies={movieTop} />
      </div>
    </section>
  );
}
