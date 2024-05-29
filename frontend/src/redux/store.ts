import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import authSlice from "./auth/authSlice";
import { apiOrders } from "./api/userOrders.api";
import { persistReducer, persistStore } from "redux-persist";
import persistConfig from "./lib/persistConfig";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "./api/auth.api";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [api.reducerPath]: api.reducer,
  [apiOrders.reducerPath]: apiOrders.reducer,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(authApi.middleware, api.middleware, apiOrders.middleware),
});

export const persistor = persistStore(store);

export default store;

export type AppStore = typeof rootReducer;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
