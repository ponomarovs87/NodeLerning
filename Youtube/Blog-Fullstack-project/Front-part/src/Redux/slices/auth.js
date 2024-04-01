import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extraReducersHelper } from "../helper/hepler";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const userDataExtraReducers = extraReducersHelper(
  fetchUserData,
  null,
  "fetchUserData"
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: { ...userDataExtraReducers },
});

export const authReducer = authSlice.reducer;
