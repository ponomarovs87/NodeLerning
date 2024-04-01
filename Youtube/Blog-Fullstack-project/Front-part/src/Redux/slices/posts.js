import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { extraReducersHelper } from "../helper/hepler";

export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags/last5");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsExtraReducers = extraReducersHelper(fetchPost,[], "posts");
const tagsExtraReducers = extraReducersHelper(fetchTags,[], "tags");

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    ...postsExtraReducers,
    ...tagsExtraReducers,
  },
});

export const postReducer = postsSlice.reducer;
