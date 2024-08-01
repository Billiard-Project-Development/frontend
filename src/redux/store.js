import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import registerReducer from "./features/auth/registerSlice";
import getTransactionByUserIdSlice from "./features/transaction/getTransactionByUserIdSlice";
import getAllTransactionSlice from "./features/transaction/getAllTransactionSlice";
import createTransactionSlice from "./features/transaction/createTransactionSlice";
import getProductPhotoByIdSlice from "./features/product/getProductPhotoByIdSlice";
import getProductByDateSlice from "./features/product/getProductByDateSlice";
import getAllProductSlice from "./features/product/getAllProductSlice";
import getAllProductPhotoSlice from "./features/product/getAllProductPhotoSlice";
import deleteProductSlice from "./features/product/deleteProductSlice";
import addProductSlice from "./features/product/addProductSlice";
import getBookingByBookingIdSlice from "./features/booking/getBookingByBookingIdSlice";
import getAllBookingSlice from "./features/booking/getAllBookingSlice";
import resetPasswordSlice from "./features/auth/resetPasswordSlice";
import requestOTPSlice from "./features/auth/requestOTPSlice";
import productAvailableSlice from "./features/product/productAvailableSlice";
import deleteTransactionByIdSlice from "./features/transaction/deleteTransactionByIdSlice";
import deleteAllTransactionSlice from "./features/transaction/deleteAllTransactionSlice";
import updateProductSlice from "./features/product/updateProductSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    getTransactionByUserId: getTransactionByUserIdSlice,
    getTransactionByTransactionId: getTransactionByUserIdSlice,
    getAllTransaction: getAllTransactionSlice,
    createTransaction: createTransactionSlice,
    getProductPhotoById: getProductPhotoByIdSlice,
    getProductByDate: getProductByDateSlice,
    getAllProduct: getAllProductSlice,
    getAllProductPhoto: getAllProductPhotoSlice,
    deleteProduct: deleteProductSlice,
    addProduct: addProductSlice,
    updateProduct: updateProductSlice,
    getBookingByBookingId: getBookingByBookingIdSlice,
    getAllBooking: getAllBookingSlice,
    resetPassword: resetPasswordSlice,
    requestOTP: requestOTPSlice,
    productAvailable: productAvailableSlice,
    deleteTransactionById: deleteTransactionByIdSlice,
    deleteAllTransaction: deleteAllTransactionSlice
  }
});

export default store;
