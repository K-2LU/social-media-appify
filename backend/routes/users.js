import express from "express";
import { getUser, updateUser, getSuggestions } from "../controllers/user.js";

const router = express.Router()

router.get("/suggestions", getSuggestions)
router.get("/find/:user_id", getUser)
router.put("/", updateUser)

export default router