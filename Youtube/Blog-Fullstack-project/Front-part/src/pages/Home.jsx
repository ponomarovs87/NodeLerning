import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPost, fetchTags, fetchComments } from "../Redux/slices/posts";
import { setSelectedTag } from "../Redux/slices/posts";

const bubbleSort = (arr, compareFn) => {
  const array = [...arr];
  const length = array.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (compareFn(array[j], array[j + 1]) > 0) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
};

const compareFnViewCount = (a, b) => b.viewCount - a.viewCount;
const compareFnCreatedAt = (a, b) =>
  new Date(b.createdAt) - new Date(a.createdAt);

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.allPosts);
  const [currentTab, setCurrentTab] = useState(0);
  const [sortedPosts, setSortedPosts] = useState(posts.data || null);
  const [isFiltred, setIsFiltred] = useState(false);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  useEffect(() => {
    setSortedPosts(
      posts.selectedTag
        ? posts.data.filter((item) => item.tags.includes(posts.selectedTag))
        : posts.data
    );
    if (posts.selectedTag) {
      setSortedPosts(
        posts.data.filter((item) => item.tags.includes(posts.selectedTag))
      );
      setIsFiltred(true);
    } else {
      setSortedPosts(posts.data);
      setIsFiltred(false);
    }
  }, [posts]);

  useEffect(() => {
    if (sortedPosts) {
      if (currentTab === 0) {
        setSortedPosts(bubbleSort(sortedPosts, compareFnCreatedAt));
      }
      if (currentTab === 1) {
        setSortedPosts(bubbleSort(sortedPosts, compareFnViewCount));
      }
    }
  }, [currentTab, isFiltred]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={11}>
          <Tabs
            style={{ marginBottom: 15 }}
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example">
            <Tab label="Новые" />
            <Tab label="Популярные" />
          </Tabs>
        </Grid>
        <Grid item xs={1}>
          {posts.selectedTag ? (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => dispatch(setSelectedTag(null))}>
              {posts.selectedTag}
            </Button>
          ) : null}
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={8}>
          {(isPostsLoading ? [...Array(5)] : sortedPosts).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl && `http://localhost:4444${obj.imageUrl}`
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid item xs={4}>
          <TagsBlock items={tags.data} isLoading={isTagsLoading} />
          <CommentsBlock
            isLoading={true}
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};
