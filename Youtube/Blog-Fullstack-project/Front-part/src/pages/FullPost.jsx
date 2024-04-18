import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import axios from "../axios";
import { selectIsAuth } from "../Redux/slices/auth";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [isHaveChenges, setIsHaveChenges] = useState(false);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        if (res) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn(err);
        alert("ошибка при получении");
      });
    setIsHaveChenges(false);
  }, [isHaveChenges]);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl && `http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost>
        <Markdown remarkPlugins={[remarkGfm]}>{data.text}</Markdown>
      </Post>
      <CommentsBlock items={[...data.comments]} isLoading={false}>
        {isAuth && <AddComment setIsHaveChenges={setIsHaveChenges} />}
      </CommentsBlock>
    </>
  );
};
