"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import genreStyles from "../Genre.module.scss";
import cardStyles from "./Movie-card.module.scss";

interface MovieCardProps {
  movie: IMovie;
}

const MoviesCard = ({ movie }: MovieCardProps) => {
  const basePath = "/my-project-vk";

   const currentSrc = movie.posterUrl && movie.posterUrl.trim() !== ""
    ? movie.posterUrl
    : `${basePath}/images/no-poster.webp`;

  return (
    <Link
      href={`/movie/${movie.id}/`}
      className={genreStyles["genre__movie-item"]}
      prefetch={true}
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
         onError={(e) => {
            const target = e.currentTarget;
            const fallbackSrc = `${basePath}/images/no-poster.webp`;
            if (target.src !== fallbackSrc) {
              target.src = fallbackSrc;
            }
          }}
        />
      </div>
    </Link>
  );
};

export default MoviesCard;
