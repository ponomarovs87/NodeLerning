import CommentModel from "../models/comment.js";
import PostModel from "../models/post.js";
import { errFunc } from "../helpers/errFunc.js";

export const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;

    const newComment = new CommentModel({
      text: req.body.text,
      user: req.userId,
      post: postId,
    });

    await newComment.save();

    await PostModel.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    res.json(newComment);
  } catch (err) {
    errFunc(res, err, "Не удалось создать коментарий");
  }
};

export const getLastComments = async (req, res) => {
  try {
    const posts = await CommentModel.find().populate("user").exec();

    const tags = posts
      .map((obj) => obj)
      .flat()
      .reverse()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    errFunc(res, err, "не удалочь загрузить теги");
  }
};
