import MoviePage from "@/components/MoviePage/MoviePage";

interface Props {
  params: Promise<{ id: string }>; // Next.js 15 требует Promise для params
}

export default async function Movie({ params }: Props) {
  const { id } = await params;
  return <MoviePage movieId={id} />;
}


// import MoviePage from "@/components/MoviePage/MoviePage";
// import { getMovieId } from "@/api/MovieApi"; // Не забудь импортировать апи
// import { notFound } from "next/navigation";
// import { IMovie } from "@/models";

// interface Props {
//   params: Promise<{ id: string }>;
//   movie: IMovie;
// }

// export default async function Movie({ params }: Props) {
//   const { id } = await params;
  
//   const movie = await getMovieId(id);

//   if (!movie) {
//     notFound();
//   }

//   return <MoviePage  movie={movie} movieId={id} />;
// }