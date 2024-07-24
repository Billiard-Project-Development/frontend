import { createSlice } from "@reduxjs/toolkit";
import { getTransactionByTransactionId } from "../../actions/transaction/transaction";

const initialState = {
  getAllTransactionByTransactionIdLoading: false,
  getAllTransactionByTransactionIdResponse: null,
  getAllTransactionByTransactionIdSuccess: null,
  getAllTransactionByTransactionIdError: false
};

const getTransactionByTransactionIdSlice = createSlice({
  name: "getTransactionByTransactionIdSlice",
  initialState,
  reducers: {
    resetStateGetTransactionByTransactionId: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionByTransactionId.pending, (state) => {
        state.getAllTransactionByTransactionIdLoading = true;
        state.getAllTransactionByTransactionIdResponse = null;
        state.getAllTransactionByTransactionIdSuccess = null;
        state.getAllTransactionByTransactionIdError = false;
      })
      .addCase(getTransactionByTransactionId.fulfilled, (state, action) => {
        state.getAllTransactionByTransactionIdLoading = false;
        state.getAllTransactionByTransactionIdResponse = action.payload;
        state.getAllTransactionByTransactionIdSuccess = true;
        state.getAllTransactionByTransactionIdError = false;
      })
      .addCase(getTransactionByTransactionId.rejected, (state, action) => {
        state.getAllTransactionByTransactionIdLoading = false;
        state.getAllTransactionByTransactionIdResponse = null;
        state.getAllTransactionByTransactionIdSuccess = null;
        state.getAllTransactionByTransactionIdError = true;
      });
  }
});

export const { resetStateGetTransactionByTransactionId } =
  getTransactionByTransactionIdSlice.actions;
export default getTransactionByTransactionIdSlice.reducer;
