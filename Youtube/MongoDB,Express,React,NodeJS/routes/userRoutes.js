import express from "express";
import * as UserController from "../controllers/userController.js";
import {
  loginValidation,
  registerValidation,
  hendleValidationErrors,
} from "../validations/ValidationMiddleware.js";
import { checkAuth } from "../utils/UtilitsMiddleware.js";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  hendleValidationErrors,
  UserController.login
);
router.post(
  "/register",
  registerValidation,
  hendleValidationErrors,
  UserController.register
);
router.get("/me", checkAuth, UserController.getMe);

export { router as userRoutes };
