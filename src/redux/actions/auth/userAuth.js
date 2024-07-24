import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "nookies";
import { getToken } from "../../../utils/auth";

export const userLogin = createAsyncThunk(
  "authLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (data.success === false) {
        return rejectWithValue(data);
      }
      setCookie(null, "access_token", data?.data?.token?.accessToken, {
        maxAge: 100 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "authRegister",
  async ({ nama, email, noHp, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        { nama, email, noHp, password, role: 2 },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (data.success === false) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (dataResetPassword, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/user/resetPassword`,
        dataResetPassword,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const requestOTP = createAsyncThunk(
  "requestOTP",
  async (dataRequestOTP, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/auth/requestOTP`,
        dataRequestOTP,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
