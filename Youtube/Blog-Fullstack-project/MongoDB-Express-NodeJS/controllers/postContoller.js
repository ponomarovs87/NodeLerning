import PostModel from "../models/post.js";
import { errFunc } from "../helpers/errFunc.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    errFunc(res, err, "Не удалось получить статьи");
  }
};

export const getOnce = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ message: "Статья не найдена" });
    }

    res.json(doc);
  } catch (err) {
    errFunc(res, err, "Не удалось получить статьи");
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const removePost = await PostModel.findByIdAndDelete(postId);
    if (!removePost) {
      return res.status(404).json({ message: "Статья не найдена" });
    }
    res.json({
      sucsess: true,
    });
  } catch (err) {
    errFunc(res, err, "Не удалось получить статьи");
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    errFunc(res, err, "Не удалось создать статью");
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        viewCount: 0,
      },
      { new: true }
    );

    return res.status(200).json({ sucsess: true });
  } catch (err) {
    errFunc(res, err, `что-то пошло не поплану /n ${err}`);
  }
};
