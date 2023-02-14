import Jwt from "jsonwebtoken";

export const isLogged = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) res.status(403).json({ message: "No rights" });
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const validToken = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = validToken;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
