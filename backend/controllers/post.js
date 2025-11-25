import pool from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = async (req, res) => {
  const query = `
    SELECT p.*, u.id as userId, name, display_pic 
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.user_id)
    ORDER BY p.created_at DESC
  `;

  try {
    const data = await pool.query(query);
    return res.status(200).json(data.rows);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = `
      INSERT INTO posts ("desc", img_link, user_id, "createdAt", audience) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;

    const imgArray = req.body.img ? [req.body.img] : []; 
    
    const values = [
      req.body.desc,
      imgArray, 
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.audience || 1 // default to 1 : public 
    ];

    try {
      await pool.query(query, values);
      return res.status(200).json("Post has been created.");
    } catch (dbErr) {
      console.error(dbErr);
      return res.status(500).json(dbErr);
    }
  });
};