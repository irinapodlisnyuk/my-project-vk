import { Icon } from "@/models";
import { formatRuntime } from "@/utils/formatRuntime";
import { GENRE_MAP } from "@/utils/ru";

import { IMovie } from "@/models";

interface MovieProps {
  movie: IMovie;
}

const getRatingClass = (rating: number) => {
  if (rating >= 8) return "intro__rating--high"; // Зеленый
  if (rating >= 6) return "intro__rating--medium"; // Желтый
  if (rating >= 4) return "intro__rating--neutral"; // серый
  return "intro__rating--low"; // Красный
};

export const IntroInfo = ({ movie }: MovieProps) => (
  <div className="intro__card-info">
    <div
      className={`intro__rating ${getRatingClass(Number(movie.tmdbRating))}`}
    >
      <Icon name="star" width={16} height={15} />
      <span className="intro__rating-text ">{movie.tmdbRating.toFixed(1)}</span>
    </div>
    <span className="intro__card-year">{movie.releaseYear}</span>
    <span className="intro__card-genre">
      {movie.genres.map((g) => GENRE_MAP[g] || g).join(", ")}
    </span>
    <div className="intro__card-runtime">
      <strong>{formatRuntime(movie.runtime)}</strong>
    </div>
  </div>
);
