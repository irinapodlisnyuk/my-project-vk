"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import DeleteFavorite from "./DeleteFavorite";
import { User } from "@/api/User";
import "./Favorite__card.scss";

interface FavoriteCardProps {
  movie: IMovie;
  priority?: boolean;
  user: User | null;
}

export const FavoriteCard = ({ movie, priority, user }: FavoriteCardProps) => {
  const basePath = "/my-project-vk";

  const currentSrc =
    movie.posterUrl && movie.posterUrl.trim() !== ""
      ? movie.posterUrl
      : `${basePath}/images/no-poster.webp`;
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
          onError={(e) => {
            const target = e.currentTarget;
            const fallbackSrc = `${basePath}/images/no-poster.webp`;
            if (target.src !== fallbackSrc) {
              target.src = fallbackSrc;
            }
          }}
        />
        <DeleteFavorite user={user} movieId={movie.id.toString()} />
      </div>
    </Link>
  );
};

export default FavoriteCard;
