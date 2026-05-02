"use client"; // Обязательно для хуков

import { useEffect, useRef, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import { IMovie } from "@/models";
import LoaderPage from "../LoaderPage/LoaderPage";
import { User } from "@/api/User";
import './Favorites.scss';


import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


interface FavoritesListProps {
  initialMovies: IMovie[];
  isLoading?: boolean; 
  user: User | null; 
}

export default function FavoritesList({
  initialMovies = [],
  isLoading,
  user,
}: FavoritesListProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const observerTarget = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < initialMovies.length) {
          setVisibleCount((prev) => prev + 5);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [visibleCount, initialMovies.length]);

  if (isLoading) {
    return <LoaderPage />;
  }

  if (initialMovies.length === 0) {
    return <p className="favorites__empty">Список избранного пуст</p>;
  }

  const renderCard = (movie: IMovie, index: number) => (
    <FavoriteCard
      key={movie.id}
      priority={index < 5}
      movie={movie}
      user={user}
    />
  );

 if (!mounted) return null;

  return (
 <>
      {/* МОБИЛЬНЫЙ СЛАЙДЕР */}
      <div className="favorites__mobile-only">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode={true}
          className="favorites__swiper"
        >
          {initialMovies.map((movie, index) => (
            <SwiperSlide key={movie.id} style={{ width: "224px" }}>
              {renderCard(movie, index)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ДЕСКТОПНАЯ СЕТКА (с бесконечным скроллом) */}
      <div className="favorites-container__desktop-only">
        <div className="favorites__wrapper">
          {initialMovies.map((movie, index) => renderCard(movie, index))}
        </div>
        
        {visibleCount < initialMovies.length && (
         <div ref={observerTarget} style={{ height: "20px" }} />
        )}
      </div>
    </>
  );
}
