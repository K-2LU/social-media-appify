import express from "express"
import { getVotes } from "../controllers/vote.js"

const router = express.Router()

router.get("/", getVotes)

export default router