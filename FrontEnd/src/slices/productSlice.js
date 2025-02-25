import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    product: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { product } = productSlice.actions;

export default productSlice.reducer;
