"use client";
import { BASE_URL } from "@/api/config";
import { GENRE_MAP } from "@/utils/ru";
import Image from "next/image";
import Link from "next/link";

interface GenreProps {
  name: string;
  backdropUrl?: string; 
  priority?: boolean; 
}

export default function GenresCard({ name, backdropUrl, priority }: GenreProps) {
  const genreKey = name.replace(/[\s-]/g, "");

  const russianName = GENRE_MAP[genreKey] || name;

 // const imageSrc = backdropUrl || `/images/${genreKey}.png`;

 const imageSrc = backdropUrl 
    ? (backdropUrl.startsWith('http') ? backdropUrl : `${BASE_URL}${backdropUrl}`)
    : `${BASE_URL}/images/${genreKey.toLowerCase()}.png`; // 👈 Запрос пойдет на сервер Skillbox

  return (
    <Link href={`/genres/${genreKey.toLowerCase()}`} className="genre__link">
      <div className="genre__card">
        <Image //для обязательно указывать размеры
          className="genre__card-image"
          src={imageSrc}
          alt={russianName}
          priority={priority} //
          width={290}
          height={220}
          unoptimized
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = "/images/no-poster.png";
          }}
          style={{ width: '100%', height: 'auto' }}
        />
        <span className="genre__card-title">
          {russianName.charAt(0).toUpperCase() +
            russianName.slice(1).toLowerCase()}
        </span>
      </div>
    </Link>
  );
}
