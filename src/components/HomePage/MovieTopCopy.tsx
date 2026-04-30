"use client";

import { Skeleton } from "antd";
console.log(Skeleton) 

export function MovieTopSkeleton() {
  return (
    <section className="movie-top">
      <div className="container">
        <h2 className="movie-top__header">Топ 10 фильмов</h2>
        <div className="movie-top__wrapper">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="movie-top__card">
               {/* Скелетон под размер твоей картинки 224x336 */}
              <Skeleton.Button 
                active 
                style={{ width: 224, height: 336, borderRadius: 16 }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
