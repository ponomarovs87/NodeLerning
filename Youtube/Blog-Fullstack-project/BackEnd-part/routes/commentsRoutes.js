import express from "express";
import * as PostCommentController from "../controllers/PostCommentController.js";
import {
  postCommentCreateValidation,
  hendleValidationErrors,
} from "../validations/ValidationMiddleware.js";
import { checkAuth } from "../utils/UtilitsMiddleware.js";

const router = express.Router();

router.post(
  "/:postId/addComment",
  checkAuth,
  postCommentCreateValidation,
  hendleValidationErrors,
  PostCommentController.addComment
);

router.get("/last5", PostCommentController.getLastComments)

export { router as commentsRoutes };
