import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

import { logout, selectIsAuth } from "../../Redux/slices/auth";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Новый BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
