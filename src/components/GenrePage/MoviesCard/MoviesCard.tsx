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
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={genreStyles["genre__movie-item"]}
      prefetch={false}
      
    >
      <div className={cardStyles["movie__card"]}>
        <Image
          src={movie.posterUrl || "images/no-poster.webp"}
          alt={movie.title || "Постер"}
          width={224}
          height={336}
          sizes="(max-width: 768px) 50vw, 224px"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          className={cardStyles["movie__card-image"]}
        />
      </div>
    </Link>
  );
};

export default MoviesCard;
