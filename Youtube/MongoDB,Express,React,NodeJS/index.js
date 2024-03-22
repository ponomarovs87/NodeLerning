import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/user.js";
import checkAuth from "./utils/checkAuth.js";

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

app.post("/auth/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPas = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPas) {
      return res.status(403).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json({ messege: "не удалось зарагестрироваться" });
  }
});

app.get("/auth/me", checkAuth, async (req, res) => {
  try {
    res.status(200).json({message:"выполнено"})
    // https://youtu.be/GQ_pTmcXNrQ?t=4458
  } catch (err) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server OK");
});
