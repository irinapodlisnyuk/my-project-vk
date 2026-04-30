"use client";
import { useEffect, useState } from "react";
import { Flex } from "antd";
import MovieCard from "@/components/GenrePage/MoviesCard/MoviesCard";
import { IMovie } from "@/models";
import { Button } from "antd";

export default function MoviesList({ allMovies }: { allMovies: IMovie[] }) {
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setVisibleCount(prev => prev === 10 ? 5 : prev);
      }
    };
    handleResize(); 
    
    //  следим за изменением экрана
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showMore = () => {
    const step = window.innerWidth <= 767 ? 5 : 10;
    setVisibleCount((prev) => prev + step);
  };
  
  return (
    <>
      <Flex className="genre__movies-list">
        {allMovies.slice(0, visibleCount).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Flex>

      {visibleCount < allMovies.length && (
        <div className="genre__show">
          <Button
            onClick={showMore}
            type="text"
            className="genre__show-btn btn"
          >
            Показать еще
          </Button>
        </div>
      )}
    </>
  );
}
