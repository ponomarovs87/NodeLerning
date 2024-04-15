import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extraReducersHelper } from "../helper/hepler";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const { data } = await axios.get("/comments/last5");
    return data;
  }
);

const initialState = {
  comments: {
    data: [],
    status: "loading",
  },
};

const commentsExtraReducers = extraReducersHelper(
  fetchComments,
  [],
  "comments"
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    ...commentsExtraReducers,
  },
});

export const { setSelectedTag } = commentsSlice.actions;

export const postReducer = commentsSlice.reducer;
