import PostModel from "../models/post.js";
import { errFunc } from "../helpers/errFunc.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .reverse();

    const uniqTags = [...new Set(tags)];

    res.json(uniqTags);
  } catch (err) {
    errFunc(res, err, "не удалочь загрузить теги");
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .reverse();

    const uniqTags = [...new Set(tags)].slice(0, 5);

    res.json(uniqTags);
  } catch (err) {
    errFunc(res, err, "не удалочь загрузить теги");
  }
};
