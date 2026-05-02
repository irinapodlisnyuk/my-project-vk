"use client";

import { useState } from "react";
import Image from "next/image";
import { IntroInfo } from "./IntroInfo";
import { IntroActions } from "./IntroActions";
import { IMovie } from "@/models";
import { getRandomMovie } from "@/api/MovieApi";

interface IntroProps {
  initialMovie: IMovie;
  movieId?: string;
}

export const Intro = ({ initialMovie, movieId }: IntroProps) => {
  const [movie, setMovie] = useState<IMovie>(initialMovie);

  const handleRefresh = async () => {
    const newMovie = await getRandomMovie();
    setMovie(newMovie);
  };

  return (
    <section className="intro">
      <div className="container">
        <div className="intro__wrapper">
          <div className="intro__card">
            <IntroInfo movie={movie} />
            <h2 className="intro__card-title">{movie.title}</h2>
            <p className="intro__card-text">{movie.plot}</p>

            <IntroActions
              onUpdate={!movieId ? handleRefresh : undefined}
              movie={movie}
              isMoviePage={!!movieId}
            />
          </div>

          <Image
            className="intro__image"
            src={movie.backdropUrl || "/images/no-poster.webp"}
            alt={movie.title || "Кино постер"}
            priority
            width={680}
            height={552}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 768px) 100vw, 680px"
            fetchPriority="high"
            quality={65}
          />
        </div>
      </div>
    </section>
  );
};
