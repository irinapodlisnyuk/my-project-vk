"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import '../Genre.scss';

interface MovieCardProps {
  movie: IMovie;
}

const MoviesCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} className="genre__movie-item">
      <div className="movie__card">
        <Image
          src={movie.posterUrl || "/images/no-poster.webp"}
          alt={movie.title || "Постер"}
          width={224}
          height={336}
          unoptimized
          style={{ objectFit: "cover",  height: "auto" }} 
          className="movie__card-image"
        />
      </div>
    </Link>
  );
};

export default MoviesCard;
