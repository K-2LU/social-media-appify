import pool from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secretkey",
    async (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      const query = `
        SELECT DISTINCT p.*, u.id AS "userId", u.username, u.first_name, u.last_name, u.display_pic
        FROM posts AS p
        JOIN users AS u ON (u.id = p.user_id)
        LEFT JOIN followers AS f ON (p.user_id = f.followed_user_id)
        WHERE (p.user_id = $1 OR f.follower_user_id = $1)
        AND (p.user_id = $1 OR p.audience = 1)
        ORDER BY p."createdAt" DESC
      `;

      try {
        const data = await pool.query(query, [userInfo.id]);
        return res.status(200).json(data.rows);
      } catch (err) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  );
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secretkey",
    async (err, userInfo) => {
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
        req.body.audience,
      ];

      try {
        await pool.query(query, values);
        return res.status(200).json("Post has been created.");
      } catch (dbErr) {
        console.error(dbErr);
        return res.status(500).json(dbErr);
      }
    }
  );
};
