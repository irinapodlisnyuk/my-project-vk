import { Suspense } from "react";
import { Intro } from "@/components/HomePage/Intro";
import MovieTop from "@/components/HomePage/MovieTop";
import { MovieTopSkeleton } from "@/components/HomePage/MovieTopCopy";
import { getRandomMovie } from "@/api/MovieApi";
import RedirectHandler from "@/components/RedirectHandler/RedirectHandler"; // 1. Импортируем наш обработчик

export default async function HomePage() {
  const movie = await getRandomMovie();

  return (
    <>
      {/* 2. Подключаем обработчик в самый верх главной страницы */}
      <Suspense fallback={null}>
        <RedirectHandler />
      </Suspense>

      <Intro initialMovie={movie} />
      <Suspense fallback={<MovieTopSkeleton />}>
        <MovieTop />
      </Suspense>
    </>
  );
}

// import { Suspense } from "react";
// import { Intro } from "@/components/HomePage/Intro";
// import MovieTop from "@/components/HomePage/MovieTop";
// import { MovieTopSkeleton } from "@/components/HomePage/MovieTopCopy";
// import { getRandomMovie } from "@/api/MovieApi";

// export default async function HomePage() {
//   const movie = await getRandomMovie();

//   return (
//     <>
//       <Intro initialMovie={movie} />
//       <Suspense fallback={<MovieTopSkeleton />}>
//         <MovieTop />
//       </Suspense>
//     </>
//   );
// }

