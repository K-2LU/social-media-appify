import Express from "express";
const app = Express()

import userRoutes from './routes/users.js'

app.use("/api/users", userRoutes)

app.listen(3000, () => {
    console.log("app listening");
})