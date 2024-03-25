import express from "express";

import mongoose from "mongoose";

import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/userController.js";
import * as PostController from "./controllers/postContoller.js";

mongoose
  .connect(
    `mongodb+srv://TestAdmin:wwwww@mytestbd.basqzin.mongodb.net/blog?retryWrites=true&w=majority&appName=MyTestBD`
  )
  .then(() => console.log("MongoDB OK"))
  .catch((err) => console.log("MongoDB Error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

// app.get("/posts", PostController.getAll);
// app.get("/posts/:id", PostController.getOnce);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
// app.delete("/posts", PostController.remove);
// app.path("/posts", PostController.update);
// https://youtu.be/GQ_pTmcXNrQ?t=5688

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server OK");
});
