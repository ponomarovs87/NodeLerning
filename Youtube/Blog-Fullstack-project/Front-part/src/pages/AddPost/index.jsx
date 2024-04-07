import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../Redux/slices/auth";
import axios from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Объединение состояний в один объект
  const [formData, setFormData] = useState({
    text: "",
    title: "",
    tags: "",
    imageUrl: null,
  });
  const inputImgRef = useRef(null);

  const handleChangeFile = async (e) => {
    console.log(e.target.files);
    try {
      const formData = new FormData();
      const image = e.target.files[0];
      formData.append("image", image);
      const { data } = await axios.post("/upload", formData);
      console.log(data);
      setFormData((prevState) => ({ ...prevState, imageUrl: data.url }));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickRemoveImage = () => {
    setFormData((prevState) => ({ ...prevState, imageUrl: null }));
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title: formData.title,
        tags: formData.tags.split(/[ ,#]+/).filter(Boolean),
        text: formData.text,
        ...(formData.imageUrl && { imageUrl: formData.imageUrl }),
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (error) {
      console.error(error, `ошибка при создании статьи`);
    }
  };

  const onChange = useCallback((value) => {
    setFormData((prevState) => ({ ...prevState, text: value }));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((res) => {
        const postData = res.data;

        const updatedData = Object.keys(postData)
          .filter((key) => formData.hasOwnProperty(key))
          .reduce((acc, key) => {
            if (key === "tags") {
              acc[key] = postData[key].join(", ");
            } else {
              acc[key] = postData[key];
            }
            return acc;
          }, {});

        setFormData((prevState) => ({ ...prevState, ...updatedData }));
      });
    }
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
      {formData.imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${formData.imageUrl}`}
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
        value={formData.title}
        onChange={(e) =>
          setFormData((prevState) => ({ ...prevState, title: e.target.value }))
        }
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={formData.tags}
        onChange={(e) =>
          setFormData((prevState) => ({ ...prevState, tags: e.target.value }))
        }
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={formData.text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? `Сохранить` : `Опубликовать`}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
