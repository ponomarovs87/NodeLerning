import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extraReducersHelper } from "../helper/hepler";
import axios from "../../axios";

export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const { data } = await axios.get("/comments/last5");
    return data;
  }
);

const initialState = {
  posts: {
    data: [],
    status: "loading",
    selectedTag: null,
  },
  tags: {
    data: [],
    status: "loading",
  },
  comments: {
    data: [],
    status: "loading",
  },
};

const postsExtraReducers = extraReducersHelper(fetchPost, [], "posts");
const tagsExtraReducers = extraReducersHelper(fetchTags, [], "tags");
const commentsExtraReducers = extraReducersHelper(
  fetchComments,
  [],
  "comments"
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedTag: (state, action) => {
      state.posts.selectedTag = action.payload;
    },
  },
  extraReducers: {
    ...postsExtraReducers,
    ...tagsExtraReducers,
    ...commentsExtraReducers,
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.data = state.posts.data.filter((obj) => {
        return obj._id !== action.meta.arg;
      });
    },
  },
});

export const { setSelectedTag } = postsSlice.actions;

export const postReducer = postsSlice.reducer;
