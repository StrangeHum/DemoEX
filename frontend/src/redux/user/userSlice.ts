import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      console.log("reducer user setFirstName > ", action);
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      console.log("reducer user setLastName > ", action);
      state.lastname = action.payload;
    },
  },
});

export const actions = userSlice.actions;

export const { setFirstName, setLastName } = actions;

export default userSlice.reducer;
