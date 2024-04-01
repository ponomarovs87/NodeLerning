import express from "express";
import * as PostController from "../controllers/postContoller.js";
import {
  postCreateValidation,
  hendleValidationErrors,
} from "../validations/ValidationMiddleware.js";
import { checkAuth } from "../utils/UtilitsMiddleware.js";

const router = express.Router();

router.get("/", PostController.getAll);
router.get("/tags", PostController.getLastTags);
router.get("/:id", PostController.getOnce);
router.post(
  "/",
  checkAuth,
  postCreateValidation,
  hendleValidationErrors,
  PostController.create
);
router.delete("/:id", checkAuth, PostController.remove);
router.patch(
  "/:id",
  checkAuth,
  postCreateValidation,
  hendleValidationErrors,
  PostController.update
);

export { router as postRoutes };
