import express from "express";
import { checkAuth, uploadsConfig } from "../utils/UtilitsMiddleware.js";
import UploadedFile from "../models/UploadedFile.js"; // Подключаем модель файла

const router = express.Router();

// Загрузка файла
router.post("/", checkAuth, uploadsConfig.single("image"), async (req, res) => {
  try {
    // Создание новой записи файла в базе данных
    const uploadedFile = new UploadedFile({
      originalname: req.file.originalname,
      expirationDate: new Date(Date.now() + 30000), // 30 секунд для тестирования (90 дней в реальном сценарии)
    });
    await uploadedFile.save();

    // Отправка URL загруженного файла
    res.status(200).json({ url: `/uploads/${req.file.originalname}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при загрузке файла" });
  }
});

// Сброс времени жизни файла
router.put("/:id/resetExpiration", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const uploadedFile = await UploadedFile.findById(id);
    if (!uploadedFile) {
      return res.status(404).json({ message: "Файл не найден" });
    }
    uploadedFile.expirationDate = new Date(Date.now() + 30000); // 30 секунд для тестирования (90 дней в реальном сценарии)
    await uploadedFile.save();
    res.status(200).json({ message: "Время жизни файла сброшено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при сбросе времени жизни файла" });
  }
});

// Таймер для удаления файлов после истечения срока действия
setInterval(async () => {
  try {
    // Находим файлы, срок действия которых истек
    const expiredFiles = await UploadedFile.find({
      expirationDate: { $lte: new Date() },
    });
    // Удаляем их
    await UploadedFile.deleteMany({
      _id: { $in: expiredFiles.map((file) => file._id) },
    });
    console.log(`${expiredFiles.length} устаревших файлов удалено`);
  } catch (error) {
    console.error("Ошибка при удалении устаревших файлов:", error);
  }
}, 60000); // Проверка каждую минуту

export { router as uploadRoutes };
