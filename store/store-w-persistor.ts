import { apiAuth } from "@/features/auth/apiAuth";
import authSliceReducer from "@/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authSliceReducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // This was added for redux-persist
      },
    }).concat([apiAuth.middleware]),
});

export const persistor = persistStore(store);
