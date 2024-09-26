const Post = require("../models/Post");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  const { title, paragraph, category, image, author } = req.body;
  const isTrending = Math.random() >= 0.5;
  try {
    const post = new Post({
      title,
      paragraph,
      category,
      image,
      author,
      isTrending,
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate("author", "username")
      .populate("comments.commentby", "username");

    const totalPosts = await Post.countDocuments();

    res.json({ posts, totalPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrendingPost = async (req, res) => {
  try {
    const trendingPosts = await Post.find({ isTrending: true })
      .sort({ date: -1 })
      .limit(3)
      .populate("author", "username")
      .populate("comments.commentby", "username");

    res.json({ trendingPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.commentby", "username");
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, paragraph, category, image } = req.body;
    post.title = title;
    post.paragraph = paragraph;
    post.category = category;
    post.image = image;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);

    post.comments.push({ comment, commentby: userId });
    await post.save();

    res.status(200).json({ message: "Comment added", post });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

exports.deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    res.status(200).json({ message: "Comment deleted", post });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

exports.editComment = async (req, res) => {};
