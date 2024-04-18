import FileSchema from "../models/file.js";
import PostModel from "../models/post.js";
import UserModel from "../models/user.js";
import fs from "fs";
import path from "path";
import { postValue } from "./value.js";

export const fileReaper = async () => {
  // принимаем basePath в качестве аргумента
  try {
    // Находим файлы, срок действия которых истек
    const expiredFiles = await FileSchema.find({
      reaper: "fileReaper",
      expirationDate: { $lte: new Date() },
    });
    // Удаляем файлы из файловой системы и записи из базы данных
    expiredFiles.forEach(async (file) => {
      const filePath = path.join(process.cwd(), file.title.locationWay);

      console.log(filePath);

      // Удаление файла
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении файла:", err);
        } else {
          console.log("Файл успешно удален");
        }
      });

      // Удаляем запись из базы данных
      await FileSchema.deleteOne({ _id: file._id });
    });
  } catch (error) {
    console.error("Ошибка при удалении устаревших файлов:", error);
  }
};

export const addPostReaper = async () => {
  try {
    const elementsWithoutReaperOrExpirationDate = await PostModel.find({
      $or: [
        { reaper: { $exists: false } },
        { expirationDate: { $exists: false } },
      ],
    });

    for (const data of elementsWithoutReaperOrExpirationDate) {
      await PostModel.findByIdAndUpdate(
        data._id,
        {
          reaper: "postReaper",
          expirationDate: new Date(data.createdAt.getTime() + postValue(data)),
        },
        { new: true }
      ).exec();
    }
  } catch (error) {
    console.log(error);
  }
};

export const postReaper = async () => {
  try {
    const expiredFiles = await PostModel.find({
      reaper: "postReaper",
      expirationDate: { $lte: new Date() },
    });
    for (const data of expiredFiles) {
      const delited = await PostModel.findByIdAndDelete(data._id);
      console.log(delited);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUserReaper = async () => {
  try {
    const elementsWithoutReaperOrExpirationDate = await UserModel.find({
      $or: [
        { reaper: { $exists: false } },
        { reaper: { $ne: "userReaper" } },
        { expirationDate: { $exists: false } },
      ],
    });

    for (const data of elementsWithoutReaperOrExpirationDate) {
      await UserModel.findByIdAndUpdate(
        data._id,
        {
          reaper: "userReaper",
          expirationDate: new Date(
            data.createdAt.getTime() + 365 * 24 * 60 * 60 * 1000
          ),
        },
        { new: true }
      ).exec();
    }
  } catch (error) {
    console.log(error);
  }
};

export const userReaper = async () => {
  try {
    const expiredFiles = await UserModel.find({
      reaper: "userReaper",
      expirationDate: { $lte: new Date() },
    });
    for (const data of expiredFiles) {
      const delited = await UserModel.findByIdAndDelete(data._id);
      console.log(delited);
    }
  } catch (error) {
    console.log(error);
  }
};
