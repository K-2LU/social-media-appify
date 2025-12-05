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


export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = $1";

  pool.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data.rows[0].id }, process.env.JWT_SECRET);

    const { password, ...others } = data.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false,    // MUST be false for localhost (http)
        sameSite: "lax",  // MUST be 'lax' so the browser sends it to port 8000
      })
      .status(200)
      .json(others);
  });
};


export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("user logged out")
};