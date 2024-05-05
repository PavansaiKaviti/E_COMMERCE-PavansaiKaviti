import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../slices/Apislices";
import cartSliceReducer from "../slices/cartSlice";
import AuthSliceReducer from "../slices/AuthSlice";

const Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: AuthSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default Store;
