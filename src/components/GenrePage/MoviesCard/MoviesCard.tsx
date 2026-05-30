"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import genreStyles from "../Genre.module.scss";
import cardStyles from "./Movie-card.module.scss";
import { useState } from "react";
import { BASE_URL } from "@/api/config";

interface MovieCardProps {
  movie: IMovie;
}

const MoviesCard = ({ movie }: MovieCardProps) => {
  const [isImageFailed, setIsImageFailed] = useState(false);
  const fallbackSrc = "/images/no-poster.webp";

  const getPosterUrl = () => {
    if (!movie.posterUrl || movie.posterUrl.trim() === "") return fallbackSrc;

    if (movie.posterUrl.startsWith("http")) return movie.posterUrl;

    if (movie.posterUrl.startsWith("/")) return `${BASE_URL}${movie.posterUrl}`;

    return `${BASE_URL}/${movie.posterUrl}`;
  };

  const currentSrc = isImageFailed ? fallbackSrc : getPosterUrl();
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={genreStyles["genre__movie-item"]}
      prefetch={false}
    >
      <div className={cardStyles["movie__card"]}>
        <Image
          src={currentSrc}
          alt={movie.title || "Постер"}
          width={224}
          height={336}
          sizes="(max-width: 768px) 50vw, 224px"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          className={cardStyles["movie__card-image"]}
          unoptimized
          onError={() => {
            if (!isImageFailed) {
              setIsImageFailed(true);
            }
          }}
        />
      </div>
    </Link>
  );
};

export default MoviesCard;
