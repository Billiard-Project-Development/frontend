import { createSlice } from "@reduxjs/toolkit";
import { createTransaction } from "../../actions/transaction/transaction";

const initialState = {
  createTransactionLoading: false,
  createTransactionResponse: null,
  createTransactionSuccess: null,
  createTransactionError: false
};

const createTransactionSlice = createSlice({
  name: "createTransaction",
  initialState,
  reducers: { resetStateCreateTransaction: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.createTransactionLoading = true;
        state.createTransactionResponse = null;
        state.createTransactionSuccess = null;
        state.createTransactionError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.createTransactionLoading = false;
        state.createTransactionResponse = action.payload;
        state.createTransactionSuccess = true;
        state.createTransactionError = false;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.createTransactionLoading = false;
        state.createTransactionResponse = null;
        state.createTransactionSuccess = false;
        state.createTransactionError = action.payload;
      });
  }
});

export default createTransactionSlice.reducer;

export const { resetStateCreateTransaction } = createTransactionSlice.actions;
