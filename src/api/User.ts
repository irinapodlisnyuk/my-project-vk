import { z } from "zod";
import { validateResponse } from "./validateResponse";
import { BASE_URL } from "./config";

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  favorites: z.array(z.string()), // массив ID фильмов
});

export type User = z.infer<typeof UserSchema>;

// Функция регистрации пользователя
export async function registerUser(
  email: string,
  name: string,
  surname: string,
  password: string,
): Promise<void> {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("name", name);
  params.append("surname", surname);
  params.append("password", password);

  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
    credentials: "include",
  });

  const validatedRes = await validateResponse(response);

  // Читаем JSON ровно один раз
  const data = await validatedRes.json();

  if (data.error) {
    throw new Error(data.error);
  }
}

export function loginUser(email: string, password: string): Promise<void> {

  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);

  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    credentials: "include", 
  })
    .then(validateResponse)
    .then(() => undefined);
}

// Исправляем fetchMe
export async function fetchMe(): Promise<User | null> {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  const validatedRes = await validateResponse(response);
  const data = await validatedRes.json();

  return UserSchema.parse(data);
}
// функция выхода
export async function logoutUser(): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  const validatedRes = await validateResponse(response);
  const data = await validatedRes.json();

  if (!data.result) {
    throw new Error("Не удалось выйти из системы");
  }
}
