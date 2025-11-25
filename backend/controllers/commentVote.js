import pool from "../connect.js";
import jwt from "jsonwebtoken";

export const getCommentLikes = (req, res) => {
    const q = "SELECT user_id FROM comment_likes WHERE comment_id = $1";

    pool.query(q, [req.query.commentId], (err, data) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(data.rows.map(like => like.user_id));
    });
};

export const addCommentLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO comment_likes (user_id, comment_id) VALUES ($1, $2)";
        const values = [
            userInfo.id,
            req.body.commentId
        ];

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment liked.");
        });
    });
};

export const deleteCommentLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2";
        const values = [
            userInfo.id,
            req.query.commentId
        ];

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment unliked.");
        });
    });
};