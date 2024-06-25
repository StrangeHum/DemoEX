import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action) => {
      state.files = state.files.filter(
        (file, index) => index !== action.payload
      );
    },
    clearFiles: (state) => {
      state.files = [];
    },
  },
});

export const { addFile, removeFile, clearFiles } = fileSlice.actions;

export default fileSlice.reducer;
