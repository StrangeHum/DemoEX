import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserRole } from "@src/types";
import { RootStore } from "../store";

export type authState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
};

const initialState: authState = {
  accessToken: "",
  refreshToken: "",
  user: null,
};

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
