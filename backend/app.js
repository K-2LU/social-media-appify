import Express from "express";
const app = Express()

import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import voteRoutes from './routes/votes.js'
import authRoutes from './routes/auth.js'

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/vote", voteRoutes)
app.use("/api/comment", commentRoutes)

app.listen(3000, () => {
    console.log("app listening");
})