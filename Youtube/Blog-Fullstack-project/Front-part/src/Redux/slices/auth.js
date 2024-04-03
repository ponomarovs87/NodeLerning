import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extraReducersHelper } from "../helper/hepler";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchIsLogin = createAsyncThunk("auth/fetchLogin", async () => {
  const { data } = await axios.get("auth/me");
  return data;
});

export const fetchRegistration = createAsyncThunk(
  "auth/registration",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const loginExtraReducers = extraReducersHelper(fetchLogin, null);
const isLoginExtraReducers = extraReducersHelper(fetchIsLogin, null);
const registrationExtraReducers = extraReducersHelper(fetchRegistration, null);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "Logout";
    },
  },
  extraReducers: {
    ...loginExtraReducers,
    ...isLoginExtraReducers,
    ...registrationExtraReducers,
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
