import express from "express";
import FileSchema from "../models/file.js";


const router = express.Router();

export const setDeathList = async (req, res, next) => {
  try {
    const data = new FileSchema({
      title: {
        name: req.file.originalname,
        type: req.file.mimetype,
        locationWay: `/uploads/${req.file.originalname}`,
      },
    });

    await data.save();

    next();
  } catch (error) {
    console.error("Ошибка при создании данных:", error);
    return res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: `${error}` });
  }
};
