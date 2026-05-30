import MovieFilter from "@/components/GenrePage/MoviesFilter/MoviesFilter"
import { Icon } from "@/models/Icon";
import { GENRE_MAP } from "@/utils/ru";
import Link from "next/link";
import genreStyles from '../../../components/GenrePage/Genre.module.scss'
import { getGenres } from "@/api/GenresApi";


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

         <MovieFilter params={params} />
        </div>
      </div>
    </section>
  );
}