import MoviePage from "@/components/MoviePage/MoviePage";

interface Props {
  params: Promise<{ id: string }>; // Next.js 15 требует Promise для params
}

export default async function Movie({ params }: Props) {
  const { id } = await params;
  return <MoviePage movieId={id} />;
}
