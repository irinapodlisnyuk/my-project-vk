import MoviePage from "@/components/MoviePage/MoviePage";
import { getAllMovieIds, getMovieId } from "@/api/MovieApi";
import { notFound } from "next/navigation";
import { IMovie } from "@/models";



interface Props {
  params: Promise<{ id: string }>;
  movie: IMovie;
}
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const ids = await getAllMovieIds();

    const hardcodedTopIds = ["340929", "561606", "1044042", "575370"];

    // Объединяем списки и убираем дубликаты через Set
    const finalIds = Array.from(new Set([...ids, ...hardcodedTopIds]));

    console.log(
      `[Next.js] Успешно создаем страницы для ${finalIds.length} фильмов.`,
    );

    return finalIds.map((id) => ({
      id: String(id),
    }));
  } catch (error) {
    console.error("Ошибка при генерации статических страниц фильмов:", error);
    return [];
  }
}

export default async function Movie({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieId(id);

  if (!movie) {
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
