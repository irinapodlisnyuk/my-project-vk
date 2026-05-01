import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type ThemeMode = "white" | "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: "white" as ThemeMode, 
  reducers: {
    
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      return action.payload;
    },
 
    toggleTheme: (state) => {
      return state === "white" ? "dark" : "white";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;