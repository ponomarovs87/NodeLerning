import React, { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../Redux/slices/auth";
import axios from "../../axios";

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const inputImgRef = useRef(null);

  const handleChangeFile = async (e) => {
    console.log(e.target.files);
    try {
      const formData = new FormData();
      const image = e.target.files[0];
      formData.append("image", image);
      const { data } = await axios.post("/upload", formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(null);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: tags.split(/[ ,#]+/).filter(Boolean),
        text,
      };

      const { data } = await axios.post("/posts", fields);

      const id = data._id;

      console.log(id);

      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error, `ошибка при создании статьи`);
    }
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }} elevation={0}>
      <Button
        onClick={() => inputImgRef.current.click()}
        variant="outlined"
        size="large">
        Загрузить превью
      </Button>
      <input ref={inputImgRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
