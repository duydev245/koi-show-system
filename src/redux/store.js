import { combineReducers } from "redux";
import userSlice from "./slices/user.slice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.VITE_NODE_ENV === "dobiet",
});

export default store;