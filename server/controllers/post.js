import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picture } = req.body;
    const user = await User.findById(userId);
    const createdPost = await Post.create({
      description,
      firstName: user.firstName,
      lastName: user.lastName,
      occupation: user.occupation,
      location: user.location,
      picturePath: picture,
      userPicturePath: user.picPath,
      likes: {},
      comments: [],
    });
    await createdPost.save();
    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if (post.likes.get(userId)) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const newPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      {
        new: true,
      }
    );
    res.status(200).json(newPost);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId } = req.body;
    const post = await Post.findById(id);
    const user = await User.findById(userId);
    post.comments.push(comment);
    const newPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );
    res.status(201).json({ post: newPost, user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
