import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../../../utils/auth";

const getAllProduct = createAsyncThunk(
  "getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/getAll`,
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

const getProductByDate = createAsyncThunk(
  "getProductByDate",
  async (date, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/transaction/getAllAvailable?tanggal=${date}`,
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

const getAllProductPhoto = createAsyncThunk(
  "getAllProductPhoto",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/getAllPhoto`,
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

const getProductPhotoById = createAsyncThunk(
  "getProductPhotoById",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/getPhotoById?produkId=${id}`,
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

const addProduct = createAsyncThunk(
  "addProduct",
  async (dataAddProduct, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/product/addNew`,
        dataAddProduct,
        {
          headers: {
            "content-type": "multipart/form-data",
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

const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/product/deleteById`,
        id,
        {
          header: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
