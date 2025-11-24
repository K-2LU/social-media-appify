import pool from "../connect.js";
import bcrypt from "bcryptjs";

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

export const login = (req, res) => {};

export const logout = (req, res) => {};
