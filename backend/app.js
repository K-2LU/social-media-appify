import 'dotenv/config';

import Express from "express";

import multer from 'multer';
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import voteRoutes from './routes/votes.js'
import authRoutes from './routes/auth.js'
import commentVoteRoutes from "./routes/commentVotes.js";
import followersRoutes from "./routes/followers.js"

import cors from "cors"
import cookieParser from "cookie-parser";

const app = Express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// middlewares
app.use(Express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true // Allow cookies to be sent/received
  })
);

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    res.status(200).json(file.filename);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/vote", voteRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/comment-vote", commentVoteRoutes);
app.use("api/follow", followersRoutes)

app.listen(8000, () => {
    console.log("app listening");
})