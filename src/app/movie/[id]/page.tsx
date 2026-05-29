import { getAllMovieIds, getMovieId } from "@/api/MovieApi";
import MoviePage from "@/components/MoviePage/MoviePage";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const ids = await getAllMovieIds();
  return ids.map((id) => ({
    id: String(id),
  }));
}


export default async function Movie({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovieId(id);

  if (!movie) {
    notFound();
  }

  return <MoviePage movie={movie} movieId={id} />;
}

// interface Props {
//   params: Promise<{ id: string }>;
//   movie: IMovie;
// }

// export async function generateStaticParams() {
//   const ids = await getAllMovieIds();

//   return ids.map((id) => ({
//     id: id,
//   }));
// }

// export default async function Movie({ params }: Props) {
//   const { id } = await params;

//   const movie = await getMovieId(id);

//   if (!movie) {
//     notFound();
//   }

//   return <MoviePage movie={movie} movieId={id} />;
// }
