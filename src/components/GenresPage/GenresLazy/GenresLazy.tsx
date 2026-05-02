"use client";
import { useState, useEffect, useRef } from "react";
import { Flex } from "antd";
import GenresCard from "@/components/GenresPage/GenresCard/GenresCard";
import { IMovie } from "@/models";
import '../Genres.scss'

interface GenresGridProps {
  genres: string[];
  movies: IMovie[];
}

export default function GenresGrid({ genres, movies }: GenresGridProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const observerTarget = useRef(null);

  useEffect(() => {
    // Создаем наблюдатель
    const observer = new IntersectionObserver(
      (entries) => {
        // Если "маячок" внизу экрана виден и есть что еще грузить
        if (entries[0].isIntersecting && visibleCount < genres.length) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      { threshold: 1.0 } // Сработает, когда маячок полностью покажется
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, genres.length]);

  const visibleGenres = genres.slice(0, visibleCount);

  return (
    <div className="genres-container">
      <Flex className="genres__wrapper">
        {visibleGenres.map((genreName, index) => {
          const foundMovie = movies.find(m => m.genres.includes(genreName));
          return (
            <GenresCard
              priority={index < 8} 
              key={genreName} 
              name={genreName} 
              backdropUrl={foundMovie?.backdropUrl} 
            />
          );
        })}
      </Flex>

      {visibleCount < genres.length && (
        <div 
          ref={observerTarget} 
          style={{ height: '100px', margin: '100px 0' }} 
        />
      )}
    </div>
  );
}

