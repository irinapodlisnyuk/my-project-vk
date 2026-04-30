"use client"; 

import { useState } from "react";
import Image from "next/image";
import { IntroInfo } from "./IntroInfo";
import { IntroActions } from "./IntroActions";
import { IMovie } from "@/models";
import { getRandomMovie } from "@/api/MovieApi";

interface IntroProps {
  initialMovie: IMovie;
  movieId?: string; // Теперь компонент знает про movieId
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
            src={movie.backdropUrl || "/images/no-poster.png"}
            alt={movie.title}
            priority
            width={680}
            height={552}
           // style={{ height: 'auto' }} 
          />
        </div>
      </div>
    </section>
  );
};

