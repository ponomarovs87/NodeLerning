import express from "express";
import { checkAuth, uploadsConfig } from "../utils/UtilitsMiddleware.js";
import * as UploadsController from "../controllers/uploadContoller.js";
import * as FileController from "../controllers/fileController.js";

const router = express.Router();

router.post(
  "/",
  checkAuth,
  uploadsConfig.single("image"),
  FileController.setDeathList,
  UploadsController.putPicture
);

export { router as uploadRoutes };
