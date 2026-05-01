import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies, getMovieId } from "@/api/MovieApi";
import { IMovie } from "@/models";

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearch",
  async (query: string) => {
    const data = await searchMovies(query);
    return data;
  },
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchById",
  async (id: string) => {
    return await getMovieId(id);
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [] as IMovie[],
    currentMovie: null as IMovie | null,
    status: "idle",
    isLoading: false,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.status = "loading";
        state.isLoading = true; 
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.searchResults = action.payload.slice(0, 5);
        state.isLoading = false;
      });
  },
});

export const { clearSearch } = movieSlice.actions;
export default movieSlice.reducer;
