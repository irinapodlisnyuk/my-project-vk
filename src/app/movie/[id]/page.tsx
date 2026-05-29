import { use } from "react";
import MovieClient from "./MovieClient";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default function MoviePageRow({ params }: Props) {
  const { id } = use(params);

  return <MovieClient id={id} />;
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
