import {
  deleteMovie,
  getMovieId,
  getMovies,
  patchMovie,
  updateMovie,
} from "./MovieApi";

import { getGenres } from "./GenresApi";
 
const Api = {
  getMovies,
  getMovieId,
  updateMovie,
  patchMovie,
  deleteMovie,
  getGenres,
};

export default Api;
