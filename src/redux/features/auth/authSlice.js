import { createSlice } from "@reduxjs/toolkit";
import nookies from "nookies";
import { userLogin } from "../../actions/auth/userAuth";

const userToken = nookies.get()?.auth_token ?? null;

const initialState = {
  authLoading: false,
  userInfo: null,
  userToken: userToken,
  authError: null,
  authSuccess: false,
  role: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStateAuth: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.authLoading = false;
        state.userInfo = payload;
        state.userToken = payload.accessToken;
        state.authSuccess = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.authError = payload;
        state.authSuccess = false;
      });
  }
});
export const { resetStateAuth } = authSlice.actions;
export default authSlice.reducer;
