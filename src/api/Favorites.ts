import { IMovie } from "@/models";
import { BASE_URL } from "./config";

export const fetchFavorites = async (): Promise<IMovie[]> => {
  const response = await fetch(`${BASE_URL}/favorites`);
  if (!response.ok) throw new Error("Ошибка загрузки избранного");

  const data = (await response.json()) as Array<
    Omit<IMovie, "id"> & { id: number | string }
  >;

  return data.map((movie) => ({
    ...movie,
    id: String(movie.id),
  }));
};

export const toggleFavorite = async (movieId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId: Number(movieId) }), 
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Текст ошибки от сервера:", errorText);
    throw new Error(`Ошибка ${response.status}: ${errorText}`);
  }
};

export const addToFavorite = async (movieId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: movieId }), 
    credentials: "include",
  });
  if (!response.ok) throw new Error("Не удалось добавить в избранное");
};

export const removeFromFavorite = async (movieId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    credentials: "include", // Обязательно и здесь!
  });
  if (!response.ok) throw new Error("Не удалось удалить из избранного");
};