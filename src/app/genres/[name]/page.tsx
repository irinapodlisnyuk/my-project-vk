import MovieFilter from "@/components/GenrePage/MoviesFilter/MoviesFilter"
import { Icon } from "@/models/Icon";
import { GENRE_MAP } from "@/utils/ru";
import Link from "next/link";
import genreStyles from '../../../components/GenrePage/Genre.module.scss'
import { getGenres } from "@/api/GenresApi";

// ⚠️ Запрещаем искать страницы динамически на лету, так как GitHub Pages — это голая статика
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const genres = await getGenres(); 
    
    return genres.map((genreName) => ({
   
      name: String(genreName).toLowerCase(), 
    }));
  } catch (error) {
    console.error("Ошибка при генерации статических страниц для жанров:", error);
    return [];
  }
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  
  // Декодируем и приводим к нижнему регистру, чтобы правильно сопоставить ключ с GENRE_MAP
  const genreKey = decodeURIComponent(name).toLowerCase();
  const russianName = GENRE_MAP[genreKey.replace(/[\s-]/g, "")] || genreKey;

  return (
    <section className={genreStyles["genre"]}>
      <div className="container">
        <div className={genreStyles["genre__wrapper"]}>
          <div className={genreStyles["genre__inner"]}>
            <Link href={`/genres`} className={genreStyles["genre__inner-link"]}>
              <div className={genreStyles["genre__icon"]}>
                <Icon name="arrow-back" width={13} height={22} />
              </div>
              <h1 className={genreStyles["genre__inner-title"]}>
                {russianName.charAt(0).toUpperCase() + russianName.slice(1)}
              </h1>
            </Link>
          </div>

          {/* Компонент фильтрации подхватит params, распарсит его на клиенте и отрендерит фильмы */}
          <MovieFilter params={params} />
        </div>
      </div>
    </section>
  );
}