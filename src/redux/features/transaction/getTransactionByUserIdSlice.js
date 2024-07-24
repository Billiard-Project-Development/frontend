import { createSlice } from "@reduxjs/toolkit";
import { getTransactionByUserId } from "../../actions/transaction/transaction";

const initialState = {
  getTransactionByUserIdLoading: false,
  getTransactionByUserIdResponse: null,
  getTransactionByUserIdSuccess: null,
  getTransactionByUserIdError: false
};

const getTransactionByUserIdSlice = createSlice({
  name: "getTransactionByUserId",
  initialState,
  reducers: {
    resetStateGetTransactionByUserId: (state) => initialState
  },
  extraReducers: (builder) =>
    builder
      .addCase(getTransactionByUserId.pending, (state) => {
        state.getTransactionByUserIdLoading = true;
        state.getTransactionByUserIdResponse = null;
        state.getTransactionByUserIdSuccess = null;
        state.getTransactionByUserIdError = false;
      })
      .addCase(getTransactionByUserId.fulfilled, (state, action) => {
        state.getTransactionByUserIdLoading = false;
        state.getTransactionByUserIdResponse = action.payload;
        state.getTransactionByUserIdSuccess = true;
        state.getTransactionByUserIdError = false;
      })
      .addCase(getTransactionByUserId.rejected, (state, action) => {
        state.getTransactionByUserIdLoading = false;
        state.getTransactionByUserIdResponse = null;
        state.getTransactionByUserIdSuccess = false;
        state.getTransactionByUserIdError = action.payload;
      })
});

export const { resetStateGetTransactionByUserId } =
  getTransactionByUserIdSlice.actions;
export default getTransactionByUserIdSlice.reducer;
