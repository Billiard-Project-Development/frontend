import { createSlice } from "@reduxjs/toolkit";
import { getBookingByBookingId } from "../../actions/booking/booking";

const initialState = {
  getBookingByBookingIdLoading: false,
  getBookingByBookingIdResponse: null,
  getBookingByBookingIdSuccess: null,
  getBookingByBookingIdError: false
};

const getBookingByBookingIdSlice = createSlice({
  name: "getBookingByBookingIdSlice",
  initialState,
  reducers: {
    resetStateBookingByBookingId: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingByBookingId.pending, (state) => {
        state.getBookingByBookingIdLoading = true;
        state.getBookingByBookingIdResponse = null;
        state.getBookingByBookingIdSuccess = null;
        state.getBookingByBookingIdError = false;
      })
      .addCase(getBookingByBookingId.fulfilled, (state, action) => {
        state.getBookingByBookingIdLoading = false;
        state.getBookingByBookingIdResponse = action.payload;
        state.getBookingByBookingIdSuccess = true;
        state.getBookingByBookingIdError = false;
      })
      .addCase(getBookingByBookingId.rejected, (state, action) => {
        state.getBookingByBookingIdLoading = false;
        state.getBookingByBookingIdResponse = null;
        state.getBookingByBookingIdSuccess = false;
        state.getBookingByBookingIdError = action.payload;
      });
  }
});

export const { resetStateBookingByBookingId } =
  getBookingByBookingIdSlice.actions;
export default getBookingByBookingIdSlice.reducer;
