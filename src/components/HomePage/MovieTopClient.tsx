"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { IMovie } from "@/models";

export default function MovieTopClient({ movies }: { movies: IMovie[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Оставляем только фильмы с уникальными id
  const uniqueMovies = useMemo(() => {
    const seen = new Set();
    return movies.filter((movie) => {
      const duplicate = seen.has(movie.id);
      seen.add(movie.id);
      return !duplicate;
    });
  }, [movies]);

  const renderCard = (movie: IMovie, index: number) => (
    <Link
      href={`/movie/${movie.id}`}
      className="movie-top__card"
      key={movie.id}
    >
      <span className="movie-top__number">{index + 1}</span>
      <div className="movie-top__image">
        <Image
          src={
            movie.posterUrl?.trim() ? movie.posterUrl : "/images/no-poster.png"
          }
          alt={movie.title || "Постер"}
          width={224}
          height={336}
          priority={index < 2}
          unoptimized
          style={{ height: "auto" }}
        />
      </div>
    </Link>
  );

  return (
    <>
      <div className="movie-top__mobile-only">
        {mounted ? (
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            slidesPerView="auto"
            spaceBetween={40}
            className="movie-top__swiper"
          >
            {uniqueMovies.slice(0, 10).map((movie, index) => (
              <SwiperSlide key={movie.id}>
                {renderCard(movie, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="movie-top__ssr-placeholder">
            {uniqueMovies.slice(0, 4).map(renderCard)}
          </div>
        )}
      </div>

      <div className="movie-top__desktop-only">
        <div className="movie-top__wrapper">
          {uniqueMovies
            .slice(0, 10)
            .map((movie, index) => renderCard(movie, index))}
        </div>
      </div>
    </>
  );
}
