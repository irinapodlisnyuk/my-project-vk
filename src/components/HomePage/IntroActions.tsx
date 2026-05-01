"use client";
import { Icon, IMovie } from "@/models";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FavoriteButton } from "../Favorites/FavoriteButton";
import { AuthModal } from "../AuthModal/AuthModal";
import { useUser } from "@/hooks/useUser";
import { TrailerModal } from "../Trailer/TrailerModal";

interface IntroActionsProps {
  onUpdate?: () => Promise<void>;
  movie: IMovie;
  isMoviePage?: boolean;
}

export const IntroActions = ({
  onUpdate,
  movie,
  isMoviePage,
}: IntroActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data: user } = useUser();

  const getValidUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("//")) return `https:${url}`;
    if (url.startsWith("www.")) return `https://${url}`;
    return url;
  };

  const handleUpdate = async () => {
    if (!onUpdate) return;
    setIsLoading(true);
    try {
      await onUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`intro__card-actions ${isMoviePage ? "isMovie" : ""}`}>
        <Button
          className="intro__thriller-btn btn"
          aria-label="Посмотреть трейлер" 
          type="text"
          onClick={() => setIsTrailerOpen(true)}
          disabled={!movie?.trailerUrl}
        >
          Трейлер
        </Button>

      
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerUrl={getValidUrl(movie.trailerUrl)}
          title={movie.title}
        />

        {!isMoviePage && (
          <Link href={`/movie/${movie.id}`} className="intro__film-link btn">
            О фильме
          </Link>
        )}

        <FavoriteButton
          user={user ?? null}
          movieId={String(movie.id)}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {onUpdate && (
          <Button
            className="intro__update-btn btn"
            aria-label="Обновить случайный фильм" 
            onClick={handleUpdate}
            disabled={isLoading}
            type="text"
          >
            {!isLoading && <Icon name="update-icon" width={20} height={20} />}
          </Button>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};
