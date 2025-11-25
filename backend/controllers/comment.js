import pool from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = async (req, res) => {
  const q = `
    SELECT c.*, u.id AS userId, u.username, u.first_name, u.last_name, u.display_pic 
    FROM comments AS c 
    JOIN users AS u ON (u.id = c.user_id)
    WHERE c.post_id = $1 
    ORDER BY c.created_at ASC
  `;

  try {
    const data = await pool.query(q, [req.query.postId]);
    return res.status(200).json(data.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Updated query to insert parent_comment_id
    const q = `
      INSERT INTO comments ("desc", created_at, user_id, post_id, parent_comment_id) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
      req.body.parentCommentId || null // if top-level comment, null
    ];

    try {
      await pool.query(q, values);
      return res.status(200).json("Comment has been created.");
    } catch (dbErr) {
      console.error(dbErr);
      return res.status(500).json(dbErr);
    }
  });
};