const express = require("express");
const { verify } = require("../middleware/auth");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getTrendingPost,
  addComment,
  deleteComment,
} = require("../controller/postcontroller");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/createPost", verify, createPost);
router.get("/allPosts", getPosts);
router.get("/trendingPost", getTrendingPost);
router.get("/:id", getPostById);
router.put("/:id", verify, updatePost);
router.delete("/:id", verify, deletePost);
router.post("/addComment/:id", verify, addComment);
router.delete("/deleteComment/:id/:commentId", verify, deleteComment);

module.exports = router;
