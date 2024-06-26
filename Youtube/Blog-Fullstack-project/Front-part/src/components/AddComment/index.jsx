import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios";

export const AddComment = ({ setIsHaveChenges }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    text: "",
  });
  const [errorText, setErrorText] = useState(null);
  const userData = useSelector((state) => state.auth.data);

  const onSubmit = async () => {
    try {
      const fields = {
        text: formData.text,
      };

      await axios.post(`/comments/${id}/addComment`, fields).then(() => {
        setIsHaveChenges(true);
        setFormData({
          text: "",
        });
      });
    } catch (error) {
      console.error(error, `ошибка при создании коментария`);
      setErrorText(error.response.data[0].msg);
    }
  };

  const onChange = (e) => {
    setErrorText(null);
    return setFormData((prevState) => ({ ...prevState, text: e.target.value }));
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`http://localhost:4444${userData.imageUrl}`}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={formData.text}
            onChange={onChange}
            error={errorText}
            helperText={errorText}
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
