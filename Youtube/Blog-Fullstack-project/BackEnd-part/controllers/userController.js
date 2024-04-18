import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { errFunc } from "../helpers/errFunc.js";

import UserModel from "../models/user.js";

import * as GuardianAngel from "../helpers/guardianAngel.js";

export const register = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
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
    errFunc(res, err, "не удалось зарагестрироваться");
  }
};
export const login = async (req, res) => {
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
    GuardianAngel.userGuardianAngel(user._id);
    res.json({ ...userData, token });
  } catch (err) {
    errFunc(res, err, "Что-то пошло не так");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const { passwordHash, ...userData } = user._doc;
    GuardianAngel.userGuardianAngel(req.userId);
    res.json({ ...userData });
  } catch (err) {
    errFunc(res, err, "Что-то пошло не так");
  }
};
