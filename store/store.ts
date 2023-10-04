import { apiRTKDemoPosts } from "@/services/apiRTKDemoPosts";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiRTKDemoPosts.reducerPath]: apiRTKDemoPosts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiRTKDemoPosts.middleware),
});

setupListeners(store.dispatch);
