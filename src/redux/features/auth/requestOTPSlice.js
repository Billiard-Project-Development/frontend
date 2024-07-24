import { createSlice } from "@reduxjs/toolkit";
import { requestOTP } from "../../actions/auth/userAuth";

const initialState = {
  requestOTPLoading: false,
  requestOTPResponse: null,
  requestOTPSuccess: null,
  requestOTPError: false
};

const requestOTPSlice = createSlice({
  name: "requestOTP",
  initialState,
  reducers: {
    resetStateRequestOTP: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOTP.pending, (state) => {
        state.requestOTPLoading = true;
        state.requestOTPResponse = null;
        state.requestOTPSuccess = null;
        state.requestOTPError = false;
      })
      .addCase(requestOTP.fulfilled, (state, action) => {
        state.requestOTPLoading = false;
        state.requestOTPResponse = action.payload;
        state.requestOTPSuccess = true;
        state.requestOTPError = false;
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.requestOTPLoading = false;
        state.requestOTPResponse = null;
        state.requestOTPSuccess = false;
        state.requestOTPError = action.payload;
      });
  }
});

export const { resetStateRequestOTP } = requestOTPSlice.actions;
export default requestOTPSlice.reducer;
