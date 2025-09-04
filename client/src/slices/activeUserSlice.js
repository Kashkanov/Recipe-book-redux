import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    auth: false
};

export const activeUserSlice = createSlice({
    name: "activeUser",
    initialState,
    reducers: {
        login: (state, action) => {
            state.name = action.payload;
            state.auth = true;
        },
        logout: (state) => {
            state.name = null;
            state.auth = false;
        },
    },
});

export const { login, logout } = activeUserSlice.actions;

export default activeUserSlice.reducer;