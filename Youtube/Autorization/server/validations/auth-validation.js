const { body } = require("express-validator");

const registration = [
  body("email", "Некоректный ввод почты").isEmail().isString(),
  body("password", "Слишком простой пароль").isLength({ min: 5 }).isString(),
];

module.exports = { registration };
