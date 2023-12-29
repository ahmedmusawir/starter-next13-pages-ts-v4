import { apiAuth } from "@/features/auth/apiAuth";
import authSiceReducer from "@/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: authSiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiAuth.middleware]),
});

setupListeners(store.dispatch);
