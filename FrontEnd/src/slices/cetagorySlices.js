import { createSlice } from "@reduxjs/toolkit";


export const cetagorySlices = createSlice({
  name: "cetagory",
    initialState: {
      cetagory:[]
  },
  reducers: {
    cetagoryInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { cetagoryInfo } = cetagorySlices.actions;

export default cetagorySlices.reducer;
