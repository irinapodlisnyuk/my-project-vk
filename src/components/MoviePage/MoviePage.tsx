import { Intro } from "../HomePage/Intro";
import { getMovieId } from "@/api/MovieApi";
import MovieInfo from "./MovieInfo";
//import { IMovie } from "@/models";

interface MoviePageProps {
  movieId: string;
  //movie: IMovie;
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
// import { Intro } from "../HomePage/Intro";
// import MovieInfo from "./MovieInfo";
// import { IMovie } from "@/models";

// interface MoviePageProps {
//   movieId: string;
//   movie: IMovie;
// }

// export default function MoviePage({ movieId, movie }: MoviePageProps) {
  

//   return (
//     <>
//       <Intro initialMovie={movie} movieId={movieId} />
//       <MovieInfo movie={movie} />
//     </>
//   );
// }