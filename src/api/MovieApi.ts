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
  // return await response.json();
  const data = await response.json();

  return data.map((item: Record<string, unknown>) => ({
    ...(item as Record<string, unknown>),
    id: String(item.id),
  }));
};

//	 Получение случайного фильма
export const getRandomMovie = async (): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/random?language=ru`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка загрузки случайного фильма");
  const data = await response.json();

  return {
    ...data,
    id: String(data.id),
  };
};

export const getMovieId = async (movieId: string): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/${movieId}?language=ru`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка получения данных");
  const data = await response.json();

  return {
    ...data,
    id: String(data.id),
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

export async function getAllMovieIds(): Promise<string[]> {
  try {
    const [resMovies, resTop, resRandom] = await Promise.all([
      fetch(`${BASE_URL}/movie??limit=200&language=ru`),
      fetch(`${BASE_URL}/movie/top10?language=ru`),
      fetch(`${BASE_URL}/movie/random?language=ru`).catch(() => null),
    ]);

    const movies = resMovies && resMovies.ok ? await resMovies.json() : [];
    const topMovies = resTop && resTop.ok ? await resTop.json() : [];
    const randomMovie =
      resRandom && resRandom.ok ? await resRandom.json() : null;

    // Сливаем все подборки в единый массив
    const allMovies = [...movies, ...topMovies];
    if (randomMovie) {
      allMovies.push(randomMovie);
    }

    const uniqueIds = Array.from(
      new Set(
        allMovies
          .filter((movie) => movie && movie.id)
          .map((movie) => String(movie.id)),
      ),
    );

    return uniqueIds;
  } catch (error) {
    console.error("Ошибка при получении ID фильмов:", error);
    return [];
  }
}
