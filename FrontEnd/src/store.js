import  {configureStore}  from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import cetagorySlices from"./slices/cetagorySlices"
import productSlice from "./slices/cetagorySlices";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cetagory: cetagorySlices,
    product:productSlice
  },
});
