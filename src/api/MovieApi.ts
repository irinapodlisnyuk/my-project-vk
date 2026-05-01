import { IMovie, Movies } from "../models";
import { BASE_URL, defaultConfig } from "./config";

// Получение фильмов
export const getMovies = async (movie: string[]): Promise<Movies> => {
  const url = `${BASE_URL}/movie?language=ru`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка загрузки  фильмов");
  const data = await response.json();
  return data;
};

// 	Получение фильмов с наивысшим рейтингом
export const getMovieTop = async (): Promise<Movies> => {
  const url = `${BASE_URL}/movie/top10?language=ru`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка загрузки  с наивысшим рейтингом");
  return await response.json();
};

//	 Получение случайного фильма
export const getRandomMovie = async (): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/random?language=ru`;
  const response = await fetch(url,  { next: { revalidate: 0 } });
  if (!response.ok) throw new Error("Ошибка загрузки случайного фильма");
  return await response.json();
};

export const getMovieId = async (movieId: string): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/${movieId}?language=ru`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка получения данных");
  const data = await response.json();

  return {
    ...data,
    id: String(data.id),
    //Исправляем опечатку года
    // releaseYear: data.relaseYear
  };
};

export const updateMovie = async (body: IMovie): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/${body.id}?language=ru`;
  const config = {
    ...defaultConfig,
    method: "PUT",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      "Ошибка  заменить объект фильма на сервере новым объектом.",
    );
  return data;
};

export const patchMovie = async (body: IMovie): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/${body.id}?language=ru`;
  const config = {
    ...defaultConfig,
    method: "PATCH",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok) throw new Error("Ошибка  частичного обновления информации");
  return data;
};

export const deleteMovie = async (movieId: number): Promise<void> => {
  const url = `${BASE_URL}/movie/${movieId}?language=ru`;
  const config = {
    ...defaultConfig,
    method: "DELETE",
  };
  const response = await fetch(url, config);
  await response.json();
};

// Поиск фильмов по названию
export const searchMovies = async (title: string): Promise<Movies> => {
  const url = `${BASE_URL}/movie?title=${encodeURIComponent(title)}&language=ru`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка поиска");
  return await response.json();
};
