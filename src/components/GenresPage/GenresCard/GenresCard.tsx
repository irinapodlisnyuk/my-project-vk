"use client";
import { BASE_URL } from "@/api/config";
import { GENRE_MAP } from "@/utils/ru";
import Image from "next/image";
import Link from "next/link";
import "../Genres.scss";
import "./Genre__card.scss";
import { useState } from "react";

interface GenreProps {
  name: string;
  backdropUrl?: string;
  priority?: boolean;
}

export default function GenresCard({
  name,
  backdropUrl,
  priority,
}: GenreProps) {
  const genreKey = name.replace(/[\s-]/g, "");

  const russianName = GENRE_MAP[genreKey] || name;

  const imageSrc = backdropUrl
    ? backdropUrl.startsWith("http")
      ? backdropUrl
      : `${BASE_URL}${backdropUrl}`
    : `${BASE_URL}/images/${genreKey.toLowerCase()}.png`; // 👈 Запрос пойдет на сервер Skillbox

  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  return (
    <Link
      href={`/genres/${genreKey.toLowerCase()}`}
      className="genre__link"
      prefetch={true}
    >
      <div className="genre__card">
        <Image
          className="genre__card-image"
          src={currentSrc}
          alt={russianName}
          priority={priority}
          width={290}
          height={220}
          unoptimized
          onError={() => {
            setCurrentSrc("/images/no-poster.webp");
          }}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            aspectRatio: "290 / 220",
          }}
        />
        <span className="genre__card-title">
          {russianName.charAt(0).toUpperCase() +
            russianName.slice(1).toLowerCase()}
        </span>
      </div>
    </Link>
  );
}
