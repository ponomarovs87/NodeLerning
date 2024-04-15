import { body } from "express-validator";

export const postCommentCreateValidation = [
  body("text")
    .notEmpty()
    .withMessage("Комментарий не может быть пустым.")
    .isLength({ min: 10 })
    .withMessage(
      "Комментарий слишком короткий, пожалуйста, будьте более креативны."
    )
    .isString()
    .withMessage("Поле комментария должно быть строкой."),
];
