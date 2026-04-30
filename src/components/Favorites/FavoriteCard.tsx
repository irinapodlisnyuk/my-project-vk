"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import DeleteFavorite from "./DeleteFavorite";
import { User } from "@/api/User";

interface FavoriteCardProps {
  movie: IMovie;
  priority?: boolean;
  user: User | null;
}

export const FavoriteCard = ({ movie, priority, user }: FavoriteCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} className="favorite__movie-item">
      <div className="favorite__card">
        <Image
          src={movie.posterUrl || "/images/no-poster.png"}
          alt={movie.title || "Постер"}
          width={224}
          height={336}
          priority={priority}
          unoptimized
          style={{ objectFit: "cover", height: "auto" }}
          className="favorite__card-image"
        />
      <DeleteFavorite user={user} movieId={movie.id.toString()} />
      
      </div>
    </Link>
  );
};

export default FavoriteCard;
