"use client";
import { AppDispatch, RootState } from "@/api/store";
import { IMovie } from "@/models";
import { clearSearch } from "@/slice/movieSlice";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { IntroInfo } from "../HomePage/IntroInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface SearchResultsProps {
  query: string;
  setQuery: (val: string) => void;
}

export const SearchResults = ({ query, setQuery }: SearchResultsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, status } = useSelector(
    (state: RootState) => state.movies,
  );

  const handleReset = () => {
    setQuery("");
    dispatch(clearSearch());
  };

  if (query.length <= 2) return null;

  const renderCard = (movie: IMovie) => (
    <Link
      href={`/movie/${movie.id}`}
      className="search__results-link"
      onClick={() => {
        setQuery("");
        dispatch(clearSearch());
      }}
    >
      <div className="search__results-content">
        <Image
          className="search__results-icon"
          src={movie.posterUrl || "/images/no-poster.png"}
          alt={movie.title}
          width={158}
          height={206}
          style={{ objectFit: "cover", height: 'auto' }}
        />
        <div className="search__results-info">
          <IntroInfo movie={movie} />
          <p className="search__results-title">{movie.title}</p>
        </div>
      </div>
    </Link>
  );

  return (
<>
    <div className="search__results-overlay" onClick={handleReset} />

    <div className="search__results">
      {status === "loading" && (
        <div className="search-loading">Загрузка...</div>
      )}
      {status !== "idle" && searchResults.length === 0 && (
        <div className="search__results-no">Ничего не найдено</div>
      )}

      <div className="search__results-mobile">
        <Swiper spaceBetween={16} slidesPerView={"auto"}>
          {searchResults.map((movie) => (
            <SwiperSlide key={movie.id} className="search__results-item">
              {renderCard(movie)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="search__results-desktop">
        <div className="search__results-list">
          {searchResults.map((movie) => (
            <div key={movie.id} className="search__results-item">
              {renderCard(movie)}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};
