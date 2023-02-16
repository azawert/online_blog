import { User } from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: "not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatFriends = friends?.map(
      ({ _id, firstName, lastName, occupation, location, picPath }) => {
        return { _id, firstName, lastName, occupation, location, picPath };
      }
    );
    res.json(formatFriends);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend)
      res
        .status(404)
        .json({ message: `${user ? `Friend` : `User`} not found` });
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends = [...user.friends, friendId];
      friend.friends = [...friend.friends, friendId];
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatFriends = friends?.map(
      ({ _id, firstName, lastName, occupation, location, picPath }) => {
        return { _id, firstName, lastName, occupation, location, picPath };
      }
    );
    res.json(formatFriends);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
