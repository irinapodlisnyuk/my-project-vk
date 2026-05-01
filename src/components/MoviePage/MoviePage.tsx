import { Intro } from "../HomePage/Intro";
import MovieInfo from "./MovieInfo";
import { IMovie } from "@/models";

interface MoviePageProps {
  movieId: string;
  movie: IMovie;
}

export default function MoviePage({ movieId, movie }: MoviePageProps) {
  

  return (
    <>
      <Intro initialMovie={movie} movieId={movieId} />
      <MovieInfo movie={movie} />
    </>
  );
}