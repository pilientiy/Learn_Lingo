import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState: {
        teachers: [],
        isLoading: false,
        isError: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTeachers.pending, state => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teachers = action.payload;             
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            });
    },
});
export default teachersSlice.reducer;
