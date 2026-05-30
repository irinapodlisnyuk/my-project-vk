"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import DeleteFavorite from "./DeleteFavorite";
import { User } from "@/api/User";
import "./Favorite__card.scss";
import { useState } from "react";
import { BASE_URL } from "@/api/config";

interface FavoriteCardProps {
  movie: IMovie;
  priority?: boolean;
  user: User | null;
}

export const FavoriteCard = ({ movie, priority, user }: FavoriteCardProps) => {
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
      prefetch={true}
      className="favorite__movie-item"
    >
      <div className="favorite__card">
        <Image
          src={currentSrc}
          alt={movie.title || "Постер"}
          width={224}
          height={336}
          priority={priority}
          unoptimized
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          className="favorite__card-image"
          onError={() => {
            if (!isImageFailed) {
              setIsImageFailed(true);
            }
          }}
        />
        <DeleteFavorite user={user} movieId={movie.id.toString()} />
      </div>
    </Link>
  );
};

export default FavoriteCard;
