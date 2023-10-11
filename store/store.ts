import { apiRTKDemoPosts } from "@/features/demo/apiRTKDemoPosts";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import postSliceReducer from "@/features/posts/postsSlice";
import postsFilterReducer from "@/features/posts/postsFilterSlice";
import { apiPosts } from "@/features/posts/apiPosts";

export const store = configureStore({
  reducer: {
    [apiPosts.reducerPath]: apiPosts.reducer,
    [apiRTKDemoPosts.reducerPath]: apiRTKDemoPosts.reducer,
    posts: postSliceReducer,
    postsFilters: postsFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiPosts.middleware,
      apiRTKDemoPosts.middleware,
    ]),
});

setupListeners(store.dispatch);
