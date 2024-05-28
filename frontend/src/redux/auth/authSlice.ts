import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserRole } from "@src/types";
import { RootStore } from "../store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type authState = {
  accessToken: string | null;
  refreshToken: string | null;
  role: UserRole | null;
  user: User | null;
};

const initialState: authState = {
  accessToken: "",
  refreshToken: "",
  //TODO: Роли пользователя
  role: UserRole.User,
  user: {
    id: 0,
    firstName: "",
    secondName: "",
    surname: "",
    email: "",
    phone: "",
  },
};

// const authPersistConfig = {
//   key: "auth",
//   storage: storage,
//   whitelist: ["accessToken", "refreshToken", "user"],
// };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: authState) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setCredentials: (state: authState, action: PayloadAction<authState>) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    updateAccessToken: (state: authState, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const actions = authSlice.actions;

export const { setCredentials, logout, updateAccessToken } = actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootStore) => state.auth.user;
export const selectAccessToken = (state: RootStore) => state.auth.accessToken;
export const selectRefreshToken = (state: RootStore) => state.auth.refreshToken;

// export const persistedAuthReducer = persistReducer(
//   authPersistConfig,
//   authSlice.reducer
// );
