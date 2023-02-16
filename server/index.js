import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/post.js";
import { isLogged } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import { posts, users } from "./data.js";
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
dotenv.config();
const app = Express();
app.use(Express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", Express.static(path.join(__dirName, "publ/assets")));

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "publ/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ store });

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server port is ${PORT}`);
      // User.insertMany(users);
      // Post.insertMany(posts);
    })
  )
  .catch((e) => console.log(e));
mongoose.set("strictQuery", false);

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts/create-post", isLogged, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRouter);
app.use("/posts", postRouter);
