import { createSlice } from "@reduxjs/toolkit";
import { deleteAllTransaction } from "../../actions/transaction/transaction";

const initialState = {
  deleteAllTransactionLoading: false,
  deleteAllTransactionResponse: null,
  deleteAllTransactionSuccess: null,
  deleteAllTransactionError: false
};

const deleteAllTransactionSlice = createSlice({
  name: "deleteAllTransaction",
  initialState,
  reducers: {
    resetStateDeleteAllTransaction: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllTransaction.pending, (state) => {
        state.deleteAllTransactionLoading = true;
        state.deleteAllTransactionResponse = null;
        state.deleteAllTransactionSuccess = null;
        state.deleteAllTransactionError = false;
      })
      .addCase(deleteAllTransaction.fulfilled, (state, action) => {
        state.deleteAllTransactionLoading = false;
        state.deleteAllTransactionResponse = action.payload;
        state.deleteAllTransactionSuccess = true;
        state.deleteAllTransactionError = false;
      })
      .addCase(deleteAllTransaction.rejected, (state, action) => {
        state.deleteAllTransactionLoading = false;
        state.deleteAllTransactionResponse = null;
        state.deleteAllTransactionSuccess = false;
        state.deleteAllTransactionError = action.payload;
      });
  }
});

export const { resetStateDeleteAllTransaction } =
  deleteAllTransactionSlice.actions;
export default deleteAllTransactionSlice.reducer;
