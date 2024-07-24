import { createSlice } from "@reduxjs/toolkit";
import { getProductByDate } from "../../actions/product/product";

const initialState = {
  getProductByDateLoading: false,
  getProductByDateResponse: null,
  getProductByDateSuccess: null,
  getProductByDateError: false
};

const getllProductByDateSlice = createSlice({
  name: "getProductByDate",
  initialState,
  reducers: {
    resetStateGetProduct: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductByDate.pending, (state) => {
        state.getProductByDateLoading = true;
        state.getProductByDateResponse = null;
        state.getProductByDateSuccess = null;
        state.getProductByDateError = false;
      })
      .addCase(getProductByDate.fulfilled, (state, action) => {
        state.getProductByDateLoading = false;
        state.getProductByDateResponse = action.payload;
        state.getProductByDateSuccess = true;
        state.getProductByDateError = false;
      })
      .addCase(getProductByDate.rejected, (state, action) => {
        state.getProductByDateLoading = false;
        state.getProductByDateResponse = null;
        state.getProductByDateSuccess = false;
        state.getProductByDateError = action.payload;
      });
  }
});

export const { resetStateGetProduct } = getllProductByDateSlice.actions;
export default getllProductByDateSlice.reducer;
