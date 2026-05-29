"use client";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models";
import DeleteFavorite from "./DeleteFavorite";
import { User } from "@/api/User";
import "./Favorite__card.scss";
import { useState } from "react";

interface FavoriteCardProps {
  movie: IMovie;
  priority?: boolean;
  user: User | null;
}

export const FavoriteCard = ({ movie, priority, user }: FavoriteCardProps) => {
   const [isImageFailed, setIsImageFailed] = useState(false);
   const basePath = "/my-project-vk";
   const fallbackSrc = `${basePath}/images/no-poster.webp`;
 
   const currentSrc =
     movie.posterUrl && movie.posterUrl.trim() !== ""
       ? movie.posterUrl
       : fallbackSrc;
 
       
  return (
    <Link
      href={`/movie/${movie.id}/`}
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
