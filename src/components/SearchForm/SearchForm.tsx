"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchMovies, clearSearch } from "@/slice/movieSlice";
import { AppDispatch } from "@/store/store";
import { Button, Input, InputRef } from "antd";
import { Icon } from "@/models/Icon";
import { SearchResults } from "../SearchResults/SearchResults";

interface SearchFormProps {
  onClose?: () => void;
  className?: string;
}

export const SearchForm = ({
  onClose,
  className = "custom__search",
}: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<InputRef>(null);


  // Эффект 2: Поиск с дебаунсом
  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        dispatch(fetchSearchMovies(query));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearch());
    }
  }, [query, dispatch]);

  return (
    <div className="header__search">
      <div className="header__search-input">
        <Input
          id="search-input-id"
          ref={inputRef}
          className={className}
          inputMode="search"
          type="text"
          autoComplete="off"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={() => inputRef.current?.blur()}
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "16px",
          }}
        />
        <Icon
          name="search"
          className="header__search-icon"
          width={20}
          height={20}
        />

        <Button
          className="header__search-close btn"
          type="text"
          style={{ zIndex: 2 }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setQuery("");
            dispatch(clearSearch());
            onClose?.();
          }}
        >
          <Icon
            name="close-icon"
            className="header__close-icon"
            width={13}
            height={13}
          />
        </Button>
      </div>
      <SearchResults query={query} setQuery={setQuery} />
    </div>
  );
};
