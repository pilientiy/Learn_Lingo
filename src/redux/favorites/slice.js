import { createSlice } from "@reduxjs/toolkit";
import { getFavoriteTeachers, addToFavoriteTeachers, removeFromFavoriteTeachers } from "./operations";
import { logOutUser } from "../auth/operations";

    
export const favoriteTeachersSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteTeachers: [],
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteTeachers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getFavoriteTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteTeachers = action.payload;
      })
      .addCase(getFavoriteTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(addToFavoriteTeachers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addToFavoriteTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteTeachers = action.payload;
      })
      .addCase(addToFavoriteTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(removeFromFavoriteTeachers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(removeFromFavoriteTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteTeachers = action.payload;
      })
      .addCase(removeFromFavoriteTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.favoriteTeachers = [];
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export default favoriteTeachersSlice.reducer;



