import { createSlice } from "@reduxjs/toolkit";
import { getProductPhotoById } from "../../actions/product/product";

const initialState = {
  getProductPhotoByIdLoading: false,
  getProductPhotoByIdResponse: null,
  getProductPhotoByIdSuccess: null,
  getProductPhotoByIdError: false
};

const getProductPhotoByIdSlice = createSlice({
  name: "getProductPhotoByIdSlice",
  initialState,
  reducers: {
    resetStateGetProductPhotoById: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductPhotoById.pending, (state) => {
        state.getProductPhotoByIdLoading = true;
        state.getProductPhotoByIdResponse = null;
        state.getProductPhotoByIdSuccess = null;
        state.getProductPhotoByIdError = false;
      })
      .addCase(getProductPhotoById.fulfilled, (state, action) => {
        state.getProductPhotoByIdLoading = false;
        state.getProductPhotoByIdResponse = action.payload;
        state.getProductPhotoByIdSuccess = true;
        state.getProductPhotoByIdError = false;
      })
      .addCase(getProductPhotoById.rejected, (state, action) => {
        state.getProductPhotoByIdLoading = false;
        state.getProductPhotoByIdResponse = null;
        state.getProductPhotoByIdSuccess = false;
        state.getProductPhotoByIdError = action.payload;
      });
  }
});

export const { resetStateGetProductPhotoById } =
  getProductPhotoByIdSlice.actions;
export default getProductPhotoByIdSlice.reducer;
