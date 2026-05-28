"use client";

import MovieFilter from "@/components/GenrePage/MoviesFilter/MoviesFilter";
import { Icon } from "@/models/Icon";
import { GENRE_MAP } from "@/utils/ru";
import Link from "next/link";
import { use } from "react";
import genreStyles from '../../../components/GenrePage/Genre.module.scss';

interface Props {
  params: Promise<{ name: string }>;
}

export default function GenrePageClient({ params }: Props) {
  // Безопасно распаковываем асинхронные параметры Next.js на клиенте
  const resolvedParams = use(params);
  const name = resolvedParams.name || "";
  const genreKey = decodeURIComponent(name).toLowerCase();
  const russianName = GENRE_MAP[genreKey] || genreKey;

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