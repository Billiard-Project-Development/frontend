import { createSlice } from "@reduxjs/toolkit";
import { productAvailable } from "../../actions/product/product";

const initialState = {
  productAvailableLoading: false,
  productAvailableResponse: null,
  productAvailableSuccess: null,
  productAvailableError: false
};

const productAvailableSlice = createSlice({
  name: "productAvailableSlice",
  initialState,
  reducers: { resetStateProductAvailable: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(productAvailable.pending, (state) => {
        state.productAvailableLoading = true;
        state.productAvailableResponse = null;
        state.productAvailableSuccess = null;
        state.productAvailableError = false;
      })
      .addCase(productAvailable.fulfilled, (state, action) => {
        state.productAvailableLoading = false;
        state.productAvailableResponse = action.payload;
        state.productAvailableSuccess = true;
        state.productAvailableError = false;
      })
      .addCase(productAvailable.rejected, (state, action) => {
        state.productAvailableLoading = false;
        state.productAvailableResponse = null;
        state.productAvailableSuccess = false;
        state.productAvailableError = action.payload;
      });
  }
});

export const { resetStateProductAvailable } = productAvailableSlice.actions;
export default productAvailableSlice.reducer;
