// import { getMovieId } from "@/api/MovieApi";
// import MoviePage from "@/components/MoviePage/MoviePage";
// import { notFound } from "next/navigation";

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function Movie({ params }: Props) {
//   const { id } = await params;
//   const movie = await getMovieId(id);

//   if (!movie) {
//     notFound();
//   }

//   return <MoviePage movie={movie} movieId={id} />;
// }

import { getAllMovieIds, getMovieId } from "@/api/MovieApi"; // Добавили импорт getAllMovieIds
import MoviePage from "@/components/MoviePage/MoviePage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllMovieIds();
  return ids.map((id) => ({
    id: String(id), 
  }));
}

export default async function Movie({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieId(id);

  if (!movie) {
    notFound();
  }

  return <MoviePage movie={movie} movieId={id} />;
}