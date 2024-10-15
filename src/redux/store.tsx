import { configureStore } from "@reduxjs/toolkit";
import wishlistsReducer from "./wishlistsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    wishlists: wishlistsReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
