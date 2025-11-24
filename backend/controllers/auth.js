import pool from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const register = (req, res) => {
  // CHECK USER IF EXISTS
  const q = "SELECT * FROM users WHERE username = $1";

  pool.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length) return res.status(409).json("User already exists!");

    // CREATE A NEW USER
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertQuery =
      "INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)";
    
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.first_name,
      req.body.last_name,
    ];

    pool.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

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
      })
      .status(200)
      .json(others);
  });
};


export const logout = (req, res) => {};