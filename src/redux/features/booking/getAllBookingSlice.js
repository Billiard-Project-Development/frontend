import { createSlice } from "@reduxjs/toolkit";
import { getAllBooking } from "../../actions/booking/booking";

const initialState = {
  getAllBookingLoading: false,
  getAllBookingResponse: null,
  getAllBookingSuccess: null,
  getAllBookingError: false
};

const getAllBookingSlice = createSlice({
  name: "getAllBookingSlice",
  initialState,
  reducers: {
    resetStateGetAllBooking: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooking.pending, (state) => {
        state.getAllBookingLoading = true;
        state.getAllBookingResponse = null;
        state.getAllBookingSuccess = null;
        state.getAllBookingError = false;
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.getAllBookingLoading = false;
        state.getAllBookingResponse = action.payload;
        state.getAllBookingSuccess = true;
        state.getAllBookingError = false;
      })
      .addCase(getAllBooking.rejected, (state, action) => {
        state.getAllBookingLoading = false;
        state.getAllBookingResponse = null;
        state.getAllBookingSuccess = false;
        state.getAllBookingError = action.payload;
      });
  }
});

export const { resetStateGetAllBooking } = getAllBookingSlice.actions;
export default getAllBookingSlice.reducer;
