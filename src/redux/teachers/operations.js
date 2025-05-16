import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";
import { database } from "../../services/firebase";

export const PER_PAGE = 4;

export const fetchTeachers = createAsyncThunk(
  "teachers/fetch",
  async (_, thunkAPI) => {
    try {
     const dataQuery = ref(database);
      const snapshot = await get(child(dataQuery, "teachers"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const teachersMarkup = Object.entries(data).map(([id, teacher]) => {
          return {
            ...teacher,
            id,
          };
        });
        return teachersMarkup;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
