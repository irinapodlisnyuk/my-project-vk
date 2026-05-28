"use client"; // 👍 Теперь это на 100% легально, так как серверной функции больше нет

import { useQuery } from "@tanstack/react-query";
import MoviePage from "@/components/MoviePage/MoviePage";
import { getMovieId } from "@/api/MovieApi";
import { notFound, useParams } from "next/navigation"; // 👈 Добавили useParams

export default function Movie() {
  const routerParams = useParams();

  const idArray = routerParams?.id;
  const id = Array.isArray(idArray) ? idArray[0] : idArray || "";

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieId(id),
    enabled: !!id,
  });

  if (isLoading || !id) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        Загрузка информации о фильме...
      </div>
    );
  }

  if (isError || !movie) {
    notFound();
  }

  return <MoviePage movie={movie} movieId={id} />;
}

// import MoviePage from "@/components/MoviePage/MoviePage";
// import { getAllMovieIds, getMovieId } from "@/api/MovieApi";
// import { notFound } from "next/navigation";
// import { IMovie } from "@/models";

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
