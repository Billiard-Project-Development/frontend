import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "nookies";

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
        { user_id: "user_97", nama, email, noHp, password, role: 1 },
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
