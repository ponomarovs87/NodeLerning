import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extraReducersHelper } from "../helper/hepler";
import axios from "../../axios";

export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags/last5");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    data: [],
    status: "loading",
  },
  tags: {
    data: [],
    status: "loading",
  },
};

const postsExtraReducers = extraReducersHelper(fetchPost, [], "posts");
const tagsExtraReducers = extraReducersHelper(fetchTags, [], "tags");

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    ...postsExtraReducers,
    ...tagsExtraReducers,
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.data = state.posts.data.filter((obj) => {
        return obj._id !== action.meta.arg;
      });
    },
  },
});

export const postReducer = postsSlice.reducer;
