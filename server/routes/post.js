import express from "express";
import {
  createComment,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.js";
import { isLogged } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isLogged, getFeedPosts);
router.get("/:userId/posts", isLogged, getUserPosts);

router.patch("/:id/like", isLogged, likePost);
router.post("/:id/comment", isLogged, createComment);
export default router;
