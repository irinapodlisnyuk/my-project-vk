import { IMovie } from "@/models";
import { getLanguageName } from "@/utils/language";

interface MovieProps {
  movie: IMovie;
}

export default function MovieInfo({ movie }: MovieProps) {
  
  return (
    <section className="movie">
      <div className="container">
        <div className="movie__info">
          <h2 className="movie__info-title">О фильме</h2>
          <ul className="movie__info-list">
            <li className="movie__info-item">
              <span className="movie__info-label">Язык оригинала</span>
              <span className="movie__info-value">
                 {movie.language?.length > 0 ? getLanguageName(movie.language) : "—"}
              </span>
            </li>
            <li className="movie__info-item">
              <span className="movie__info-label">Бюджет</span>
              <span className="movie__info-value">
                {movie.budget && movie.budget !== "0"
                  ? `${Number(movie.budget).toLocaleString("ru-RU")} руб.`
                  : "—"}
              </span>
            </li>
            <li className="movie__info-item">
              <span className="movie__info-label">Выручка</span>
              <span className="movie__info-value">
                {movie.revenue && movie.revenue !== "0"
                  ? `${Number(movie.revenue).toLocaleString("ru-RU")} руб.`
                  : "—"}
              </span>
            </li>
            <li className="movie__info-item">
              <span className="movie__info-label">Режиссёр</span>
              <span className="movie__info-value">{movie.director || "—"}</span>
            </li>
            <li className="movie__info-item">
              <span className="movie__info-label">Продакшен</span>
              <span className="movie__info-value">
                {movie.production || "—"}
              </span>
            </li>
            <li className="movie__info-item">
              <span className="movie__info-label">Награды</span>
              <span className="movie__info-value">
                {movie.awardsSummary || "Нет наград"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
