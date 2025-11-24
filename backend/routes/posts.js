import express from "express"
import {  } from "../controllers/post.js"

const router = express.Router()

router.get("/find/:post_id", getPost)

export default router