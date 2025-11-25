import 'dotenv/config';

import Express from "express";
const app = Express()

import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import voteRoutes from './routes/votes.js'
import authRoutes from './routes/auth.js'

import cors from "cors"
import cookieParser from "cookie-parser";

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

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/vote", voteRoutes)
app.use("/api/comment", commentRoutes)

app.listen(8000, () => {
    console.log("app listening");
})