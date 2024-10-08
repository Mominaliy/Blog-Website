const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraph: { type: String, required: true },
  image: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      comment: String,
      commentby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  category: { type: String },
  date: { type: Date, default: Date.now },
  isTrending: { type: Boolean },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
