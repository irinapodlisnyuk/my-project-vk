import { Intro } from "../HomePage/Intro";
import { getMovieId } from "@/api/MovieApi"; 
import MovieInfo from "./MovieInfo";

interface MoviePageProps {
  movieId: string; 
}

export default async function MoviePage({ movieId }: MoviePageProps) {
  const movie = await getMovieId(movieId);

  if (!movie) return <div>Фильм не найден</div>;

  return (
    <>
      <Intro initialMovie={movie} movieId={movieId} />
      <MovieInfo movie={movie} />
    </>
  );
}
