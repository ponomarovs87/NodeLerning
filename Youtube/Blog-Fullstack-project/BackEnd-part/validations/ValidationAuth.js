export const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Неверный формат почты" });
  }

  if (password.length < 5) {
    return res.status(400).json({ message: "Слишком короткий пароль" });
  }

  next();
};

export const registerValidation = (req, res, next) => {
  const { email, password, fullName, avatarUrl } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Неверный формат почты" });
  }

  if (password.length < 5) {
    return res.status(400).json({ message: "Слишком короткий пароль" });
  }

  if (fullName.length < 3) {
    return res.status(400).json({ message: "Слишком короткое имя" });
  }

  if (avatarUrl && !isValidUrl(avatarUrl)) {
    return res.status(400).json({ message: "Неверная ссылка на аватарку" });
  }

  next();
};

const isValidEmail = (email) => {
  // Простая проверка формата email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUrl = (url) => {
  // Простая проверка формата URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};
