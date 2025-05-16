import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logInUser, logOutUser, checkAuthState } from "./operations";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        isLoading: false,
        userId: null,
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.userId = action.payload.uid;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userId = action.payload.uid;
                state.isLoggedIn = true;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.user = null;
                state.userId = null;
                state.isLoggedIn = false;
            }) 
            .addCase(checkAuthState.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userId = action.payload?.uid || null;
                state.isLoggedIn =  !!action.payload;
            })  
    }
});

export default authSlice.reducer;