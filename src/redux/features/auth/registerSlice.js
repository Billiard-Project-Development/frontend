import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../../actions/auth/userAuth";

const initialState = {
  registerLoading: false,
  registerResponse: null,
  registerSuccess: null,
  registerError: false
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetStateRegister: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.registerLoading = true;
        state.registerResponse = null;
        state.registerSuccess = null;
        state.registerError = false;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerResponse = action.payload;
        state.registerSuccess = true;
        state.registerError = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerResponse = null;
        state.registerSuccess = false;
        state.registerError = action.payload;
      });
  }
});

export const { resetStateRegister } = registerSlice.actions;

export default registerSlice.reducer;
