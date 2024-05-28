import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type AppStore = typeof rootReducer;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// setupListeners(store.dispatch);
