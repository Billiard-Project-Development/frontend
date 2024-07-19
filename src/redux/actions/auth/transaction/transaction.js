import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../../../utils/auth";

const getAllTransaction = createAsyncThunk(
  "getAllTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/transaksi/getAll`,
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

const getTransactionByTransactionId = createAsyncThunk(
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

const getTransactionByUserId = createAsyncThunk(
  "getTransactionByUserId",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/transaction/getTransaksiByUserId?userId=${id}`,
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

const createTransaction = createAsyncThunk(
  "createTransaction",
  async (dataTransaction, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/transaction/create`,
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
