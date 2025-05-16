import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    language: "",
    price: "",
    level: "",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    clearFilters: (state) => {
      state.language = "";
      state.price = "";
      state.level = "";
    },
  },
});

export const { setLanguage, setPrice, setLevel, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
export const selectFilters = (state) => state.filters;
