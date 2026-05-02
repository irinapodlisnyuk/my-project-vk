import { getGenres } from "@/api/GenresApi";
import { getMovies } from "@/api/MovieApi";
import GenresLazy from "../GenresLazy/GenresLazy";
import '../Genres.scss'


const GenresList = async () => {

  const data = await Promise.all([getGenres(), getMovies([])]) 
    .catch(() => null);

  if (!data) return <div className="genres__wrapper-error">Ошибка загрузки</div>;

  const [genres, movies] = data;
  return <GenresLazy genres={genres} movies={movies} />;
};
export default GenresList;