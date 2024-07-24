import { createSlice } from "@reduxjs/toolkit";
import { getAllProductPhoto } from "../../actions/product/product";

const initialState = {
  getAllProductPhotoLoading: false,
  getAllProductPhotoResponse: null,
  getAllProductSuccess: null,
  getAllProductError: false
};

const getAllProductPhotoSlice = createSlice({
  name: "getAllProductPhotoSlice",
  initialState,
  reducers: {
    resetStateGetAllProductPhoto: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductPhoto.pending, (state) => {
        state.getAllProductPhotoLoading = true;
        state.getAllProductPhotoResponse = null;
        state.getAllProductSuccess = null;
        state.getAllProductError = false;
      })
      .addCase(getAllProductPhoto.fulfilled, (state, action) => {
        state.getAllProductPhotoLoading = false;
        state.getAllProductPhotoResponse = action.payload;
        state.getAllProductSuccess = true;
        state.getAllProductError = false;
      })
      .addCase(getAllProductPhoto.rejected, (state, action) => {
        state.getAllProductPhotoLoading = false;
        state.getAllProductPhotoResponse = null;
        state.getAllProductSuccess = false;
        state.getAllProductError = action.payload;
      });
  }
});

export const { resetStateGetAllProductPhoto } = getAllProductPhotoSlice.actions;
export default getAllProductPhotoSlice.reducer;
