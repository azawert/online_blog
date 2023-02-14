import express from "express";
import {
  addRemoveFriend,
  getAllUsers,
  getUser,
  getUserFriends,
} from "../controllers/user.js";
import { isLogged } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", isLogged, getUser);
router.get("/:id/friends", isLogged, getUserFriends);
router.get("/", isLogged, getAllUsers);

router.patch("/:id/:friendId", isLogged, addRemoveFriend);

export default router;
