import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../../utils/auth";

export const getAllTransaction = createAsyncThunk(
  "getAllTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/transaksi/getTransaksiList`,
        {
          headers: {
            Authorization: `Bearer ${token}`
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

export const getTransactionByTransactionId = createAsyncThunk(
  "getTransactionByTransactionId",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/transaction/getTransaksiById?transaksiId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
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

export const getTransactionByUserId = createAsyncThunk(
  "getTransactionByUserId",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/transaksi/getTransaksiByUserId?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
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

export const createTransaction = createAsyncThunk(
  "createTransaction",
  async (dataTransaction, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/transaksi/createTransaksi`,
        dataTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`
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

export const deleteTransactionById = createAsyncThunk(
  "deleteTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/transaksi/deleteTransaksi?transaksiId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
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

export const deleteAllTransaction = createAsyncThunk(
  "deleteAllTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/transaksi/deleteAllTransaksi`,
        {
          headers: {
            Authorization: `Bearer ${token}`
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
