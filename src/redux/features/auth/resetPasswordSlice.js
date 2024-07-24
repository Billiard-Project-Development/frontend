import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../../actions/auth/userAuth";

const initialState = {
  resetPasswordLoading: false,
  resetPasswordResponse: null,
  resetPasswordSuccess: null,
  resetPasswordError: false
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetStateResetPassword: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordResponse = null;
        state.resetPasswordSuccess = null;
        state.resetPasswordError = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordResponse = action.payload;
        state.resetPasswordSuccess = true;
        state.resetPasswordError = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordResponse = null;
        state.resetPasswordSuccess = false;
        state.resetPasswordError = action.payload;
      });
  }
});

export const { resetStateResetPassword } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
