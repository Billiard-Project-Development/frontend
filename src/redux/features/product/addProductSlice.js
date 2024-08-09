import { createSlice } from "@reduxjs/toolkit";
import { addProduct } from "../../actions/product/product";

const initialState = {
  addProductLoading: false,
  addProductResponse: null,
  addProductSuccess: null,
  addProductError: false
};

const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState,
  reducers: {
    resetStateAddProduct: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.addProductLoading = true;
        state.addProductResponse = null;
        state.addProductSuccess = null;
        state.addProductError = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductLoading = false;
        state.addProductResponse = action.payload;
        state.addProductSuccess = true;
        state.addProductError = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductLoading = false;
        state.addProductResponse = null;
        state.addProductSuccess = false;
        state.addProductError = action.payload;
      });
  }
});

export const { resetStateAddProduct } = addProductSlice.actions;
export default addProductSlice.reducer;
