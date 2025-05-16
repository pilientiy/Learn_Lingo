import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './auth/slice';
import teachersReducer from './teachers/slice.js';
import favoriteTeachersReducer from './favorites/slice.js';
import filtersReducer from './filters/slice.js';

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn"],
};
const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favoriteTeachers"],
};
const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["language", "level", "price"],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoriteTeachersReducer);
const persistedFiltersReducer = persistReducer(filtersPersistConfig, filtersReducer);

export const store = configureStore({
	reducer: {
    auth: persistedAuthReducer,
    teachers: teachersReducer,
    favorites: persistedFavoritesReducer,
    filters: persistedFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);