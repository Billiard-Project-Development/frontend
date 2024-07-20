import { createSlice } from "@reduxjs/toolkit";
import { getAllTransaction } from "../../actions/transaction/transaction";

const initialState = {
  getAllTransactionLoading: false,
  getAllTransactionResponse: null,
  getAllTransactionSuccess: null,
  getAllTransactionError: false
};

const getAllTransactionSlice = createSlice({
  name: "getAllTransactionSlice",
  initialState,
  reducers: {
    resetStateDeleteProduct: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransaction.pending, (state) => {
        state.getAllTransactionLoading = true;
        state.getAllTransactionResponse = null;
        state.getAllTransactionSuccess = null;
        state.getAllTransactionError = false;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.getAllTransactionLoading = false;
        state.getAllTransactionResponse = action.payload;
        state.getAllTransactionSuccess = true;
        state.getAllTransactionError = false;
      })
      .addCase(getAllTransaction.rejected, (state, action) => {
        state.getAllTransactionLoading = false;
        state.getAllTransactionResponse = null;
        state.getAllTransactionSuccess = false;
        state.getAllTransactionError = action.payload;
      });
  }
});

export const { resetStateDeleteProduct } = getAllTransactionSlice.actions;
export default getAllTransactionSlice.reducer;
