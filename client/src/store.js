import {configureStore} from "@reduxjs/toolkit";
import activeUserReducer from "./slices/activeUserSlice";

const store = configureStore({
    reducer: {
        activeUser: activeUserReducer,
    }
})

export default store;