import express from "express"
import { login, register, logout } from "../controllers/auth.js"

const router = express.Router()

// Use POST for register/login and POST for logout (can be adjusted later)
router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

export default router