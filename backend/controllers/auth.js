import 'dotenv/config'

import pool from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json("required field missing")
    }

    try {
        const query = "SELECT * FROM users where username = $1";
        const existingUser = await pool.query(query, [req.body.username]);

        if (existingUser.rows.length) {
            // 409 forbidden error
            return res.status(409).json("user exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const insertQuery = "INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)";

        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.first_name,
            req.body.last_name,
        ];

        await pool.query(insertQuery, values);
        // 201: created
        return res.status(200).json("user created");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}


export const login = async(req, res) => {
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const dbReq = await pool.query(query, [req.body.email]);
        
        const invalidCredMsg = "Invalid Email or Password";

        if (!dbReq.rows.length)   {
            // 404: not found error
            return res.status(401).json(invalidCredMsg);
        }

        const userInfo = dbReq.rows[0];

        const checkPassword = await bcrypt.compare(
            req.body.password,
            userInfo.password
        )
        if (!checkPassword) {
            return res.status(401).json(invalidCredMsg);
        }

        const token = jwt.sign(
            {id: userInfo.id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"},
        )

        const {password, ...others} = userInfo;

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        .status(200)
        .json(others);

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
}


export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: false,
        sameSite: "lax"
    })
    .status(200)
    .json("User logged out");
}