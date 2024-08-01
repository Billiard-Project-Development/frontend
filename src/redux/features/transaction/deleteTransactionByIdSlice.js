import { createSlice } from "@reduxjs/toolkit";
import { deleteTransactionById } from "../../actions/transaction/transaction";

const initialState = {
  deleteTransactionByIdResponse: null,
  deleteTransactionByIdLoading: false,
  deleteTransactionByIdSuccess: null,
  deleteTransactionByIdError: false
};

const deleteTransactionByIdSlice = createSlice({
  name: "deleteTransactionById",
  initialState,
  reducers: { resetStateDeleteTransactionById: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTransactionById.pending, (state) => {
        state.deleteTransactionByIdResponse = null;
        state.deleteTransactionByIdLoading = true;
        state.deleteTransactionByIdSuccess = null;
        state.deleteTransactionByIdError = false;
      })
      .addCase(deleteTransactionById.fulfilled, (state, action) => {
        state.deleteTransactionByIdLoading = false;
        state.deleteTransactionByIdResponse = action.payload;
        state.deleteTransactionByIdSuccess = true;
        state.deleteTransactionByIdError = false;
      })
      .addCase(deleteTransactionById.rejected, (state) => {
        state.deleteTransactionByIdLoading = false;
        state.deleteTransactionByIdResponse = null;
        state.deleteTransactionByIdSuccess = false;
        state.deleteTransactionByIdError = true;
      });
  }
});
export const { resetStateDeleteTransactionById } =
  deleteTransactionByIdSlice.actions;
export default deleteTransactionByIdSlice.reducer;
