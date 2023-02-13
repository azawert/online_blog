import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picPath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picPath,
      friends,
      location,
      occupation,
      viewedProfile: 0,
      impression: 0,
    });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
