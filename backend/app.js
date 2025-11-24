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
// parse JSON bodies (only once)
app.use(Express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/vote", voteRoutes)
app.use("/api/comment", commentRoutes)

app.listen(3000, () => {
    console.log("app listening");
})