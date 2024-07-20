import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../../actions/product/product";

const initialState = {
  getAllProductLoading: false,
  getAllProductResponse: null,
  getAllProductSuccess: null,
  getAllProductError: false
};

const getAllProductSlice = createSlice({
  name: "getAllProductSlice",
  initialState,
  reducers: { resetStateGetAllProduct: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.getAllProductLoading = true;
        state.getAllProductResponse = null;
        state.getAllProductSuccess = null;
        state.getAllProductError = false;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.getAllProductLoading = false;
        state.getAllProductResponse = action.payload;
        state.getAllProductSuccess = true;
        state.getAllProductError = false;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.getAllProductLoading = false;
        state.getAllProductResponse = null;
        state.getAllProductSuccess = false;
        state.getAllProductError = action.payload;
      });
  }
});

export const { resetStateGetAllProduct } = getAllProductSlice.actions;
export default getAllProductSlice.reducer;
