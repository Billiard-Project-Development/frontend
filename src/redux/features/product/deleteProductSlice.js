import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct } from "../../actions/product/product";

const initialState = {
  deleteProductLoading: false,
  deleteProductResponse: null,
  deleteProductSuccess: null,
  deleteProductError: false
};

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    resetStateDeleteProduct: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
        state.deleteProductResponse = null;
        state.deleteProductSuccess = null;
        state.deleteProductError = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductResponse = action.payload;
        state.deleteProductSuccess = true;
        state.deleteProductError = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductResponse = null;
        state.deleteProductSuccess = false;
        state.deleteProductError = action.payload;
      });
  }
});

export const { resetStateDeleteProduct } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
