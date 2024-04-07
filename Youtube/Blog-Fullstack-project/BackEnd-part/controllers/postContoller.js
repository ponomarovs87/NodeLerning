import PostModel from "../models/post.js";
import { errFunc } from "../helpers/errFunc.js";
import * as GuardianAngel from "../helpers/guardianAngel.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts.reverse());
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
    ).populate("user");

    if (!doc) {
      return res.status(404).json({ message: "Статья не найдена" });
    }
    GuardianAngel.postGuardianAngel(postId);
    GuardianAngel.fileGuardianAngel(doc.imageUrl);
    GuardianAngel.userGuardianAngel(doc.user._id, 0.1);

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

    GuardianAngel.userGuardianAngel(req.userId, 2);
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
        imageUrl: req.body.imageUrl || null,
        user: req.userId,
        viewCount: 0,
      },
      { new: true }
    );

    GuardianAngel.postGuardianAngel(postId);
    GuardianAngel.fileGuardianAngel(updatedPost.imageUrl);
    GuardianAngel.userGuardianAngel(req.userId, 0.5);
    return res.status(200).json({ sucsess: true });
  } catch (err) {
    errFunc(res, err, `что-то пошло не поплану /n ${err}`);
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(posts);
  } catch (err) {
    errFunc(res, err, "не удалочь загрузить теги");
  }
};
