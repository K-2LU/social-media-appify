import express from "express";
import { getCommentLikes, addCommentLike, deleteCommentLike } from "../controllers/commentVote.js";

const router = express.Router()

router.get("/", getCommentLikes)
router.post("/", addCommentLike)
router.delete("/", deleteCommentLike)

export default router