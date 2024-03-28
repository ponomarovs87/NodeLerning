import express from "express";
import { checkAuth, uploadsConfig } from "../utils/UtilitsMiddleware.js";

const router = express.Router();

router.post("/", checkAuth, uploadsConfig.single("image"), (req, res) => {
  res.status(200).json({ url: `/uploads/${req.file.originalname}` });
});

export { router as uploadRoutes };
