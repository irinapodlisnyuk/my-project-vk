"use client";
import { BASE_URL } from "@/api/config";
import { GENRE_MAP } from "@/utils/ru";
import Image from "next/image";
import Link from "next/link";
import "../Genres.scss";
import "./Genre__card.scss";
import { useEffect, useState } from "react";

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
  const genreKey = name.replace(/[\s-]/g, "").toLowerCase();
  const russianName = GENRE_MAP[genreKey] || name;
  const genreUrlParam = name.toLowerCase();

  const imageSrc = backdropUrl
    ? backdropUrl.startsWith("http")
      ? backdropUrl
      : `${BASE_URL}${backdropUrl}`
    : `${BASE_URL}/images/${genreKey.toLowerCase()}.png`;

  const [isImageFailed, setIsImageFailed] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  const [prevImageSrc, setPrevImageSrc] = useState(imageSrc);

  if (imageSrc !== prevImageSrc) {
    setPrevImageSrc(imageSrc);
    setIsImageFailed(false);
    setCurrentSrc(imageSrc);
  }

  const fallbackSrc = "/my-project-vk/images/no-poster.webp";

  return (
    <Link
      href={`/genres/${encodeURIComponent(genreUrlParam)}/`}
      className="genre__link"
      prefetch={false}
    >
      <div className="genre__card">
        <Image
          className="genre__card-image"
          src={isImageFailed ? fallbackSrc : currentSrc}
          alt={russianName}
          priority={priority}
          width={290}
          height={220}
          unoptimized
          onError={() => {
            if (!isImageFailed) {
              setIsImageFailed(true);
            }
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
