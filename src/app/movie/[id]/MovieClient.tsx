"use client";

import { useEffect, useState } from "react";
import { getMovieId } from "@/api/MovieApi";
import MoviePage from "@/components/MoviePage/MoviePage";
import { notFound } from "next/navigation";
import { IMovie } from "@/models";
import { Spin } from "antd";

export default function MovieClient({ id }: { id: string }) {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getMovieId(id);
        if (data) {
          setMovie(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Ошибка загрузки фильма на клиенте:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <Spin size="large" tip="Загрузка информации о фильме..." />
      </div>
    );
  }

  if (error || !movie) {
    notFound();
  }

  return <MoviePage movie={movie} movieId={id} />;
}