import { BASE_URL } from "./config";


export const getGenres = async (): Promise<string[]> => {
  const url = `${BASE_URL}/movie/genres?language=ru`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Не удалось загрузить жанры");

  return await response.json();
};

