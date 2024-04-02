import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extraReducersHelper } from "../helper/hepler";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});


const initialState = {
  items: null,
  status: "loading",
};

const userDataExtraReducers = extraReducersHelper(fetchAuth, null);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: { ...userDataExtraReducers },
});

export const selectIsAuth = (state) => Boolean(state.auth.items);

export const authReducer = authSlice.reducer;
