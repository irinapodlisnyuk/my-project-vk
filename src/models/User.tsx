import { IMovie } from "./Movies";

export interface User {
  email: string;
  name: string;
  surname: string;
  favorites: IMovie[];
}