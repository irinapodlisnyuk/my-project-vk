
import MovieFilter from "@/components/GenrePage/MoviesFilter/MoviesFilter"
import { Icon } from "@/models/Icon";
import { GENRE_MAP } from "@/utils/ru";
import Link from "next/link";

export default async function GenrePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const genreKey = decodeURIComponent(name).toLowerCase();

  const russianName = GENRE_MAP[genreKey] || genreKey;

  return (
    <section className="genre">
      <div className="container">
        <div className="genre__wrapper">
          <div className="genre__inner">
            <Link href={`/genres`} className="genre__inner-link">
              <div className="genre__icon">
                <Icon name="arrow-back" width={13} height={22} />
              </div>
              <h1 className="genre__inner-title">
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

