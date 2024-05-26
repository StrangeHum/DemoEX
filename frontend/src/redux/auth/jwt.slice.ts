import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type JWTToken = {
  token: string;
};

const initialState: JWTToken = {
  token: "",
};

export const userSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    setUser: (state: JWTToken, action: PayloadAction<JWTToken>) => {
      console.log("reducer user setFirstName > ", action);
      state = action.payload;
    },
  },
});

export const actions = userSlice.actions;

export const { setUser } = actions;

export default userSlice.reducer;
