import { errFunc } from "../helpers/errFunc.js";

export const putPicture = async (req, res) => {
  try {
    res.status(200).json({ url: `/uploads/${req.file.originalname}` });

    
  } catch (err) {
    errFunc(res, err, "не удалочь загрузить теги");
  }
};

export const resetExpiration = async (req, res) => {
  try {
  } catch (err) {
    errFunc(res, err, "не удалочь загрузить теги");
  }
};
