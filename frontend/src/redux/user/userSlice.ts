import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@src/types";

const initialState: User = {
  id: 0,
  firstName: "",
  secondName: "",
  surname: "",
  email: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log("reducer user setFirstName > ", action);
      state = action.payload;
    },
  },
});

export const actions = userSlice.actions;

export const { setUser } = actions;

export default userSlice.reducer;
