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
      prefetch={false}
    >
      <span className="movie-top__number">{index + 1}</span>
      <div className="movie-top__image">
        <Image
          src={
            movie.posterUrl?.trim()
              ? movie.posterUrl
              : "/images/no-poster.webp"
          }
          alt={movie.title || "Постер"}
          unoptimized
          width={224}
          height={336}
          priority={index < 2}
          sizes="(max-width: 768px) 50vw, 224px"
          quality={75}
          style={{ width: "100%", height: "auto" }}
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
            {uniqueMovies.slice(0, 10).map(renderCard)}
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


// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode } from "swiper/modules";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import { IMovie } from "@/models";

// export default function MovieTopClient({ movies }: { movies: IMovie[] }) {
//   const [mounted, setMounted] = useState(false);
  
//   // 1. Добавляем стейт для отслеживания сломанных картинок (по их id)
//   const [failedImages, setFailedImages] = useState<Record<string | number, boolean>>({});

//    useEffect(() => {
//     setMounted(true);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);


//   // Оставляем только фильмы с уникальными id
//   const uniqueMovies = useMemo(() => {
//     const seen = new Set();
//     return movies.filter((movie) => {
//       const duplicate = seen.has(movie.id);
//       seen.add(movie.id);
//       return !duplicate;
//     });
//   }, [movies]);

//   const fallbackSrc = "/images/no-poster.webp";

//   const renderCard = (movie: IMovie, index: number) => {
//     // 2. Проверяем, падала ли уже картинка для этого фильма
//     const isImageFailed = failedImages[movie.id];
//     const hasValidPoster = movie.posterUrl?.trim();
    
//     // Если постер изначально пустой ИЛИ картинка уже выдала ошибку — ставим заглушку
//     const currentSrc = (hasValidPoster && !isImageFailed) ? movie.posterUrl! : fallbackSrc;

//     return (
//       <Link
//         href={`/movie/${movie.id}`}
//         className="movie-top__card"
//         key={movie.id}
//         prefetch={false}
//       >
//         <span className="movie-top__number">{index + 1}</span>
//         <div className="movie-top__image">
//           <Image
//             src={currentSrc} // 3. Используем вычисленный безопасный путь
//             alt={movie.title || "Постер"}
//             unoptimized
//             width={224}
//             height={336}
//             priority={index < 2}
//             sizes="(max-width: 768px) 50vw, 224px"
//             quality={75}
//             style={{ width: "100%", height: "auto" }}
//             onError={() => {
//               // 4. Безопасно меняем стейт только ОДИН раз. Цикл невозможен!
//               if (!isImageFailed) {
//                 setFailedImages((prev) => ({ ...prev, [movie.id]: true }));
//               }
//             }}
//           />
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <>
//       <div className="movie-top__mobile-only">
//         {mounted ? (
//           <Swiper
//             modules={[FreeMode]}
//             freeMode={true}
//             slidesPerView="auto"
//             spaceBetween={40}
//             className="movie-top__swiper"
//           >
//             {uniqueMovies.slice(0, 10).map((movie, index) => (
//               <SwiperSlide key={movie.id}>
//                 {renderCard(movie, index)}
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <div className="movie-top__ssr-placeholder">
//             {uniqueMovies.slice(0, 10).map((movie, index) => renderCard(movie, index))}
//           </div>
//         )}
//       </div>

//       <div className="movie-top__desktop-only">
//         <div className="movie-top__wrapper">
//           {uniqueMovies
//             .slice(0, 10)
//             .map((movie, index) => renderCard(movie, index))}
//         </div>
//       </div>
//     </>
//   );
// }