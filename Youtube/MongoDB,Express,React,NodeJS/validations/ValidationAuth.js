import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Слишком короткий пароль").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Слишком короткий пароль").isLength({ min: 5 }),
  body("fullName", "Слишом короткое имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];
