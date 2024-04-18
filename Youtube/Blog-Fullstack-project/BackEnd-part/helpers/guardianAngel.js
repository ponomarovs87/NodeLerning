import FileModel from "../models/file.js";
import PostModel from "../models/post.js";
import UserModel from "../models/user.js";
const fileAdd = 10 * 24 * 60 * 60 * 1000;
const postAdd = 10 * 24 * 60 * 60 * 1000;
const userAdd = 10 * 24 * 60 * 60 * 1000;

export const fileGuardianAngel = async (fileLocation) => {
  try {
    // Находим файлы по его пути
    const files = await FileModel.find({
      "title.locationWay": fileLocation,
    });
    if (!files || files.length === 0) {
      console.log("Файлы не найдены");
      return;
    }
    // Добавляем время жизни к файлам
    for (const file of files) {
      const newExpirationDate = new Date(
        file.expirationDate.getTime() + fileAdd
      ); // Например, добавляем 24 часа к текущей дате
      file.expirationDate = newExpirationDate;
      await file.save();
    }

    console.log("Время жизни успешно добавлено для всех файлов");
  } catch (error) {
    console.log("Ошибка:", error);
  }
};

export const postGuardianAngel = async (postId) => {
  try {
    // Находим пост по его ID
    const post = await PostModel.findById(postId);
    if (!post) {
      console.log("Пост не найден");
      return;
    }

    // Добавляем жизни к посту
    const newExpirationDate = new Date(post.expirationDate.getTime() + postAdd); // Например, добавляем 24 часа к текущей дате
    post.expirationDate = newExpirationDate;
    await post.save();

    console.log("Жизни успешно добавлены к посту:", post);
  } catch (error) {
    console.log("Ошибка:", error);
  }
};

export const userGuardianAngel = async (userId, activityValue = 1) => {
  try {
    // Находим пост по его ID
    const user = await UserModel.findById(userId);
    if (!user) {
      console.log("Пост не найден");
      return;
    }

    // Добавляем жизни к посту
    const newExpirationDate = new Date(
      user.expirationDate.getTime() + userAdd * activityValue
    ); // Например, добавляем 24 часа к текущей дате
    user.expirationDate = newExpirationDate;
    await user.save();

    console.log("Жизни успешно добавлены :", user);
  } catch (error) {
    console.log("Ошибка:", error);
  }
};
