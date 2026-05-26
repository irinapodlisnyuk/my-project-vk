import MoviePage from "@/components/MoviePage/MoviePage";
import { getAllMovieIds, getMovieId } from "@/api/MovieApi";
import { notFound } from "next/navigation";
import { IMovie } from "@/models";

interface Props {
  params: Promise<{ id: string }>;
  movie: IMovie;
}

export async function generateStaticParams() {
  const ids = await getAllMovieIds(); 
  
  return ids.map((id) => ({
    id: id,
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
