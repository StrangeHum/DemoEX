import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { authApi } from "./api/auth.api";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;

export type AppStore = typeof rootReducer;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// setupListeners(store.dispatch);
