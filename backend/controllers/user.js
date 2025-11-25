import pool from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const userId = req.params.user_id;
  const q = "SELECT * FROM users WHERE id = $1";

  try {
    const data = await pool.query(q, [userId]);
    
    if (data.rows.length === 0) return res.status(404).json("User not found!");
    
    const { password, ...info } = data.rows[0];
    return res.status(200).json(info);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      UPDATE users 
      SET first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          address = COALESCE($3, address), 
          cover_pic = COALESCE($4, cover_pic), 
          display_pic = COALESCE($5, display_pic) 
      WHERE id = $6
    `;

    const values = [
      (req.body.first_name || req.body.name) || null,
      (req.body.last_name) || null,
      (req.body.address || req.body.city) || null,
      (req.body.coverPic || req.body.cover_pic) || null, 
      (req.body.profilePic || req.body.display_pic) || null, 
      userInfo.id
    ];

    try {
      const data = await pool.query(q, values);
      if (data.rowCount > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your own profile!");
    } catch (dbErr) {
      console.error(dbErr);
      return res.status(500).json(dbErr);
    }
  });
};

export const getSuggestions = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      SELECT id, username, first_name, last_name, display_pic 
      FROM users 
      WHERE id != $1 
      AND id NOT IN (
          SELECT followed_user_id 
          FROM followers 
          WHERE follower_user_id = $1
      )
      LIMIT 3
    `;

    try {
      const data = await pool.query(q, [userInfo.id]);
      return res.status(200).json(data.rows);
    } catch (dbErr) {
      console.error(dbErr);
      return res.status(500).json(dbErr);
    }
  });
};