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
    const ifExists = await User.findOne({ email });
    if (ifExists) res.status(400).json({ message: "This email already taken" });
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Bad password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.json({ user, token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
