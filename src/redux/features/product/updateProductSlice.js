import { createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "../../actions/product/product";

const initialState = {
  updateProductLoading: false,
  updateProductResponse: null,
  updateProductSuccess: null,
  updateProductError: false
};

const updateProductSlice = createSlice({
  name: "updateProductSlice",
  initialState,
  reducers: {
    resetStateUpdateProduct: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.updateProductLoading = true;
        state.updateProductResponse = null;
        state.updateProductSuccess = null;
        state.updateProductError = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductResponse = action.payload;
        state.updateProductSuccess = true;
        state.updateProductError = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductResponse = null;
        state.updateProductSuccess = false;
        state.updateProductError = false;
      });
  }
});

export const { resetStateUpdateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;
