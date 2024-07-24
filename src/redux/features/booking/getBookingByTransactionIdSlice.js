import { createSlice } from "@reduxjs/toolkit";
import { getBookingByTransactionId } from "../../actions/booking/booking";

const initialState = {
  getBookingByTransactionIdLoading: false,
  getBookingByTransactionIdResponse: null,
  getBookingByTransactionIdSuccess: null,
  getBookingByTransactionIdError: false
};

const getBookingByTransactionIdSlice = createSlice({
  name: "getBookingByTransactionIdSlice",
  initialState,
  reducers: {
    resetStateGetBookingByTransactionId: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingByTransactionId.pending, (state) => {
        state.getBookingByTransactionIdLoading = true;
        state.getBookingByTransactionIdResponse = null;
        state.getBookingByTransactionIdSuccess = null;
        state.getBookingByTransactionIdError = false;
      })
      .addCase(getBookingByTransactionId.fulfilled, (state, action) => {
        state.getBookingByTransactionIdLoading = false;
        state.getBookingByTransactionIdResponse = action.payload;
        state.getBookingByTransactionIdSuccess = true;
        state.getBookingByTransactionIdError = false;
      })
      .addCase(getBookingByTransactionId.rejected, (state, action) => {
        state.getBookingByTransactionIdLoading = false;
        state.getBookingByTransactionIdResponse = null;
        state.getBookingByTransactionIdSuccess = false;
        state.getBookingByTransactionIdError = action.payload;
      });
  }
});

export const { resetStateGetBookingByTransactionId } =
  getBookingByTransactionIdSlice.actions;
export default getBookingByTransactionIdSlice.reducer;
