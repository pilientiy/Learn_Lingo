import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, set } from "firebase/database";
import { database } from "../../services/firebase";


export const getFavoriteTeachers = createAsyncThunk(
  "favorite/getFavoriteTeachers",
  async (userId, thunkAPI) => {
    try {
      const favoritesRef = ref(database, `users/${userId}/favoriteTeachers`);
      const snapshot = await get(favoritesRef);
      const favoriteTeachers = snapshot.exists() ? snapshot.val() : [];
      return favoriteTeachers ? favoriteTeachers : [];
    } catch (error) {
      console.error("Error fetching favorite teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToFavoriteTeachers = createAsyncThunk(
  "favorite/addToFavoriteTeachers",
  async (data, thunkAPI) => {
    try {
      const { userId, teacherId } = data;
      const favoritesRef = ref(database, `users/${userId}/favoriteTeachers`);
      const snapshot = await get(favoritesRef);
      let currentFavorites = snapshot.exists() ? snapshot.val() : [];
      if (!currentFavorites) {
        currentFavorites = [];
      }
      if (currentFavorites.includes(teacherId)) {
        return currentFavorites; 
      }
      const updatedFavorites = [...currentFavorites, teacherId];
      await set(favoritesRef, updatedFavorites);
      const updatedSnapshot = await get(favoritesRef);
      const newFavorites = updatedSnapshot.exists() ? updatedSnapshot.val() : [];
      return newFavorites ? newFavorites : [];
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromFavoriteTeachers = createAsyncThunk(
  "favorite/removeFromFavoriteTeachers",
  async (data, thunkAPI) => {
    try {
      const { userId, teacherId } = data;
      const favoritesRef = ref(database, `users/${userId}/favoriteTeachers`);
      const snapshot = await get(favoritesRef);
      let currentFavorites = snapshot.exists() ? snapshot.val() : [];
      if (!currentFavorites) {
        currentFavorites = [];
      }
      const updatedFavorites = currentFavorites.filter((id) => id !== teacherId);
      await set(favoritesRef, updatedFavorites);
      const updatedSnapshot = await get(favoritesRef);
      const newFavorites = updatedSnapshot.exists() ? updatedSnapshot.val() : [];;
      return newFavorites ? newFavorites : [];
    } catch (error) {
      console.error("Error removing from favorites:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);